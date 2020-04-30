import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FormationEntity } from "./formation.entity";
import { Repository, DeleteResult } from "typeorm";
import { FormsRO, FormRO } from "./formation.interface";
import { FormationDto } from "./dto";
import { UserEntity } from "src/user/user.entity";
import { create } from "domain";

@Injectable()
export class FormationService {

    constructor(
        @InjectRepository(FormationEntity)
        private readonly formationRepository: Repository<FormationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    
    async findAll(): Promise<FormsRO> {
        const formations = await this.formationRepository.find({relations: ['user']});
        return { formations };
    }

    async findAllByUser(id: number): Promise<FormsRO> {
        const formations = await this.formationRepository.find({where: {user: id}, relations: ['user']});
        return {formations};
    }

    // async findOne(): Promise<
    async createRelated(idUser: number, dto: FormationDto) {
        
        const newFormation = new FormationEntity;
        const created = Object.assign(newFormation, dto);
        const user = await this.userRepository.findOne({ where: {id: idUser}, relations: ['formations']});
        
        if(user) {
            user.formations.push(created);
            await this.userRepository.save(user);
        }
        // On ne veut pas les relations de l'utilisateur
        const related = await this.userRepository.findOne({ where: {id: idUser} });
        created.user = related;
        return await this.formationRepository.save(created);
    }

    async update(id: number, dto: FormationDto): Promise<FormRO> {
        const toUpdate = await this.formationRepository.findOne({id: id});
        const updated = Object.assign(toUpdate, dto);
        const formation = await this.formationRepository.save(toUpdate);
        return { formation };
    }


    async delete( id: number): Promise<DeleteResult> {
        return await this.formationRepository.delete({id: id});
    }
}