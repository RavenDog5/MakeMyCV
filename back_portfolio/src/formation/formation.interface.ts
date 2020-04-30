import { FormationEntity } from "./formation.entity";

//  POUR LA CREATION
export interface IFormation {

    name: String;
    location: String;
    coordonateY: string;
    coordonateX: string;
    yearStart: number;
    yearEnd: number;
    description: string;

}


// POUR LA RECUPERATION
export interface FormRO {
    formation: FormationEntity;
}

export interface FormsRO {
    formations: FormationEntity[];
}