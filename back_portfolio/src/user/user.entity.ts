import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { SkillEntity } from 'src/skills/skills.entity';
import { ExperienceEntity } from 'src/experience/experience.entity';


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
  
    @Column()
    @IsEmail()
    email: string;

    @Column()
    avatar: string;

    @Column()
    address: string;

    @Column({length:10})
    phone: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany( type => ExperienceEntity, experience => experience.owner)
    experiences: ExperienceEntity[];
}