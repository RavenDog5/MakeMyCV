import { ExperienceEntity } from "./experience.entity";

export interface ExperienceData {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
}

export interface xpRO {
    experience: ExperienceEntity;
}

export interface xpsRO {
    experiences: ExperienceEntity[];
}