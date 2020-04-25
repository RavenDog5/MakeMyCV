import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, Entity, ManyToMany } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { ExperienceEntity } from "src/experience/experience.entity";

@Entity('skill')
export class SkillEntity {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 0})
    countUsedIn: number;
}