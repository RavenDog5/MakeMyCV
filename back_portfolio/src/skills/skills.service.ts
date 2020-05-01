import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { SkillEntity } from './skills.entity';
import { SkillDto } from './dto';
import { SkillsRO, SkillRO } from './skills.interface';
import { UserEntity } from 'src/user/user.entity';
import { ExperienceEntity } from 'src/experience/experience.entity';
import { ExperienceService } from 'src/experience/experience.service';


@Injectable()
export class SkillsService {

    constructor(
        @InjectRepository(SkillEntity)
        private readonly skillRepository: Repository<SkillEntity>,
        @InjectRepository(ExperienceEntity)
        private readonly xpRespository: Repository<ExperienceEntity>,
    ) { }

    async findAll(query): Promise<SkillsRO> {
        const qb = await getRepository(SkillEntity)
            .createQueryBuilder('skill')
        const skills = await qb.getMany();
        return {skills};

    }

    async findOne(id: number): Promise<SkillEntity> {
        const skill = await this.skillRepository.findOne({id: id});

        if(!skill)
            return null;

        else if(skill)
            return skill;
        
    }

    async createOne(dto: SkillDto): Promise<SkillEntity> {

        const skill = await this.skillRepository.findOne({where: {name: dto.name}});
        if(!skill) {
            const newskill = new SkillEntity();
            newskill.name = dto.name;
            newskill.countUsedIn = 0;
            // skill.countUsedIn++;
    
            // On ajoute la nouvelle compétence
            const skillCreated = await this.skillRepository.save(newskill);
            return skillCreated;
        } else {
            throw new HttpException({ message: 'La compétence est déjà existante'}, HttpStatus.BAD_REQUEST);
        }
    }

    async create(xpId: number, dto: SkillDto): Promise<SkillEntity> {
        
        const skill = new SkillEntity();
        skill.name = dto.name;
        // skill.level = dto.level;
        skill.countUsedIn = 0;
        skill.countUsedIn++;

        // On ajoute la nouvelle compétence
        const newSkill = await this.skillRepository.save(skill);

        // On lie la nouvelle compétence à l'experience
        const experienceRelated = await this.xpRespository.findOne({ where: { id: xpId}, relations: ['skills']});
        if(experienceRelated) {
            experienceRelated.skills.push(skill);
            await this.xpRespository.save(experienceRelated);
        }
        return newSkill;

    }

    async update(id: number, skillData): Promise<SkillRO> {
        let toUpdate = await this.skillRepository.findOne({id: id});
        let updated = Object.assign(toUpdate, skillData);

        const experiences = await this.xpRespository.find({relations: ['skills']});
        for(let i=1; i < experiences.length; i++ ) {
            const xptoUpdate = experiences[i].skills.findIndex( _skill => _skill.id == id)

            if(xptoUpdate > 0) {
                const skillToUpdate = Object.assign(experiences[i].skills[xptoUpdate], updated);
                await this.xpRespository.save(experiences[i]);
            }
        }

        const skill = await this.skillRepository.save(updated);
        return {skill};
    }

    async delete(id: number): Promise<DeleteResult> {

        const experiences = await this.xpRespository.find({relations:['skills']});
        // console.log('experiences : ', experiences);
        if(experiences.length != 0) {
            for(let i=1; i < experiences.length; i++ ) {
                const toDelete = experiences[i].skills.findIndex( _skill => _skill.id == id)
    
                if(toDelete > 0) {
                    const deleted = experiences[i].skills.splice(toDelete, 1);
                    await this.xpRespository.save(experiences[i]);
                }
            }
        }

        return await this.skillRepository.delete(id);
    }

    async assignTo(idXp: number, idSkill: number) {

        const experience = await this.xpRespository.findOne({where : {id: idXp}, relations: ['skills']});
        const skill = await this.skillRepository.findOne({ id: idSkill});

        if(experience && skill) {
            skill.countUsedIn++;
            experience.skills.push(skill);
            const experienceUpdated = await this.xpRespository.save(experience);
            return {experienceUpdated};
        }
    }
}
