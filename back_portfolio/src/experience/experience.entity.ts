import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { type } from "os";
import { SkillEntity } from "src/skills/skills.entity";
import { UserEntity } from "src/user/user.entity";

@Entity('experience')
export class ExperienceEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150})
    name: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    endDate: Date;

    @Column({length: 500})
    description: string;

    @ManyToMany( type => SkillEntity)
    @JoinTable()
    skills: SkillEntity[];

    @ManyToOne( type => UserEntity, user => user.experiences)
    owner: UserEntity;
}
