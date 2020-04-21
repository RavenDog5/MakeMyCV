import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { SECRET } from '../config';
import { resetPasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({relations: ['experiences']});
    }

    async findOneToLogin({email, password}: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({email});

        // If the user is not known
        if(!user) 
            return null;
        if(await bcrypt.compareSync(password, user.password)) 
            return user;
        else
            return null;
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        // Checker l'unicité de l'utilisateur
        const {username, email, password, address, avatar} = dto;

        const qb = getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email });


        const user = await qb.getOne();

        if(user) {
            const error = { message: 'Username and Password must be unique.'};
            throw new HttpException({ message: 'Input data validation failed ', error}, HttpStatus.BAD_REQUEST);
        }

        // Création d'un nouvel utilisation si l'unicité est bien respectée
        const newUser = new UserEntity();
        newUser.username = username;
        newUser.address = address;
        newUser.avatar = avatar;
        newUser.password = password;
        newUser.email = email;

        const userValidationErrors = await validate(newUser);

        if(userValidationErrors.length > 0) {
            const _errors = { message: 'User input is not valid.'};
            throw new HttpException({ message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }

    }

    async findByEmail (email: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({email: email});

        if(!user){
            throw new HttpException({ message: "Pas d'utilisateur pour cet email"}, HttpStatus.NOT_FOUND);
        } else {
            return this.buildUserRO(user);
        }
    }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
        let toUpdate = await this.userRepository.findOne(id);
        let updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }

    async resetPassword(id: number, dto: resetPasswordDto): Promise<UserEntity> {
        let toUpdate = await this.userRepository.findOne(id);
        // RAZ du champ "Password"
        delete toUpdate.password;
        let updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }
    
    async delete(email: string): Promise<DeleteResult> { 
        return await this.userRepository.delete({email: email});
    }

    // #region Utils functions

    // --- PUBLIC FUNCTIONS ---
    public generateJwt(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000
        }, SECRET);
    }

    // --- PRIVATE FUNCTIONS ---


    private buildUserRO(user: UserEntity) {
        const userRO = {
          id: user.id,
          username: user.username,
          email: user.email,
          token: this.generateJwt(user),
          avatar: user.avatar
        };
    
        return {user: userRO};
      } 

    //#endregion
}
