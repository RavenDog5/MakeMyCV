import { SkillEntity } from "./skills.entity";

export interface SkillData {
    name: string;

}

export interface SkillRO {
    skill: SkillEntity;
}


export interface SkillsRO {
    skills: SkillEntity[];
}