import { ApiProperty } from "@nestjs/swagger";

export class FormationDto {

    @ApiProperty({
        type: String,
        example: 'Lycée Jean-Michel'
    })
    readonly name: string;

    @ApiProperty({
        type: String
    })
    readonly location: string;

    @ApiProperty({
        type: String
    })
    readonly coordonateY: string;
    
    @ApiProperty({
        type: String
    })
    readonly coordonateX: string;

    @ApiProperty({
        type: Number
    })
    readonly yearStart: number; 

    @ApiProperty({
        type: Number
    })
    readonly yearEnd: number;

    @ApiProperty({
        type: String
    })
    readonly description: string;
}