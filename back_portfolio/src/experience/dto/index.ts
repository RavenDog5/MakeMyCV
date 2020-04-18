import { ApiProperty } from "@nestjs/swagger";

export class ExperienceDto {

    @ApiProperty({
        type: String,
        description: 'The user\'s experience',
        example: 'My New Job !'
    })
    readonly name: string;

    @ApiProperty({
        type: Date
    })
    readonly startDate: Date;

    @ApiProperty({
        type: Date
    })
    readonly endDate: Date;

    @ApiProperty({
        type: String
    })
    readonly description: string;
}