import { Controller, Get, Body, Post, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { SkillDto, AssignToDto } from './dto';
import { SkillsRO } from './skills.interface';
import { SkillEntity } from './skills.entity';

@ApiTags('Skill')
@Controller('skill')
export class SkillsController {

    constructor(
        private skillService: SkillsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all skills'})
    @ApiOkResponse({ description: 'List of skills successfully returned !'})
    @ApiNotFoundResponse({ description: 'Ressource not found'})
    async getAll(@Query() query): Promise<SkillsRO> {
        // console.log('[GET] skills');
        return this.skillService.findAll(query);
    }

    @Post(':id')
    @ApiOperation({ summary: 'Create a new skill'})
    @ApiOkResponse({ description: 'Skill successfully created !'})
    @ApiResponse({ status: 201, description: 'Compétence créée avec succès !'})
    async create(@Param('id') id: number,@Body() skillData: SkillDto) {
        // console.log('[POST] CREATE Skill : ', skillData);
        return this.skillService.create(id, skillData);
    }


    @Post('detail/:id')
    @ApiOperation({ summary: 'Get The detail of a skill'})
    async getOne(@Param('id') id: number) {
        // console.log('[POST] DETAIL skill : ', id)
        return this.skillService.findOne(id);
    }

    @Post('assign')
    @ApiOperation({ summary: 'Assign an existing skill to an experience'})
    async assignTo(@Body() assignation: AssignToDto) {
        console.log('[POST] ASSIGN skill : ', assignation);
        return this.skillService.assignTo(assignation.idExperience, assignation.idSkill);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Update a skill'})
    async update(@Param('id')id: number, @Body() skilltoUpdate: SkillDto) {
        return this.skillService.update(id, skilltoUpdate);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a skill'})
    async delete(@Param('id') id: number) {
        return this.skillService.delete(id);
    }
}
