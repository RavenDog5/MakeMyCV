import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FormRO, FormsRO } from "./formation.interface";
import { FormationService } from "./formation.service";
import { FormationDto } from "./dto";
import { identity } from "rxjs";


@ApiTags('Formation')
@Controller('formation')
export class FormationController {

    constructor( private formationService: FormationService) { }


    @Get()
    @ApiOperation({summary: 'Get all formations'})
    async getAll(): Promise<FormsRO> {
        return this.formationService.findAll();
    }


    @Get(':id')
    @ApiOperation({summary: 'Get all formations for one user'})
    async getAllByUser(@Param('id') idUser: number): Promise<FormsRO> {
        return this.formationService.findAllByUser(idUser);
    }

    @Post(':id')
    @ApiOperation({ summary: 'Create a new formation'})
    async create(@Param('id') id: number, @Body() formData: FormationDto) {
        return this.formationService.createRelated(id, formData);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing formation'})
    async update(@Param('id') id: number, @Body() formData: FormationDto) {
        return this.formationService.update(id, formData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an existing formation'})
    async delete(@Param('id') id: number) {
        return this.formationService.delete(id);
    }
}