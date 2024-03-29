import { ApiProperty } from "@nestjs/swagger";

export class SkillDto {

    @ApiProperty({
        type: String,
        description: 'The user\'s skill',
        example: 'English'
    })
    readonly name: string;

}

export class AssignToDto {
    @ApiProperty({
        type: Number
    })
    readonly idExperience: number;

    @ApiProperty({
        type: Number
    })
    readonly idSkill: number;
}