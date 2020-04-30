import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "src/user/user.entity";

@Entity('formation')
export class FormationEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    coordonateY: string;
    
    @Column()
    coordonateX: string;

    @Column()
    yearStart: number;

    @Column()
    yearEnd: number;

    @Column({length: 500})
    description: string;

    @ManyToOne( type => UserEntity, user => user.formations )
    user: UserEntity
}