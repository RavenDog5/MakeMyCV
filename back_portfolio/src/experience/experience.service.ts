import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceEntity } from './experience.entity';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { xpRO, xpsRO, ExperienceData } from './experience.interface';
import { ExperienceDto } from './dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class ExperienceService {

    constructor(
        @InjectRepository(ExperienceEntity)
        private readonly xpRepository: Repository<ExperienceEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<xpsRO> {
        // const qb = await getRepository(ExperienceEntity)
        //     .createQueryBuilder('experience');

        // const experiences = await qb.getMany();
        // return {experiences};
        const experiences = await this.xpRepository.find({relations: ['skills']})
        return {experiences};
    }

    // async create(dto: ExperienceData): Promise<ExperienceEntity> {
    async create(idUser: number, dto: ExperienceDto) {
        const experience = new ExperienceEntity();
        experience.skills = [];
        const created = Object.assign(experience, dto);

        // On lie l'experience à l'utilisateur
        const user = await this.userRepository.findOne({ where: {id: idUser}, relations: ['experiences']});
        if(user) {
            user.experiences.push(created);
            await this.userRepository.save(user);
        }
        const userRelated = await this.userRepository.findOne({id: user.id});
        created.owner = userRelated;

        return await this.xpRepository.save(created);
    }

    async update(id: number, dto: ExperienceDto): Promise<xpRO> {
        const toUpdate = await this.xpRepository.findOne({id: id});
        const updated = Object.assign(toUpdate, dto);
        const experience = await this.xpRepository.save(toUpdate);
        return {experience}
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.xpRepository.delete({id: id});
    }
}
