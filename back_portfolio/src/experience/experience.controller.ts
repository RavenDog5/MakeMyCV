import { Controller, Post, Body, Get, Put, Param, Delete, Query } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExperienceDto } from './dto';
import { xpRO, xpsRO } from './experience.interface';
import { DeleteResult } from 'typeorm';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {

    constructor(
        private xpService: ExperienceService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all experiences'})
    async getAll(@Query() query): Promise<xpsRO> {
        return this.xpService.findAll();
    }

    @Post(':id')
    @ApiOperation({ summary: 'Create a new experience'})
    async create(@Param('id') idUser: number, @Body() xpData: ExperienceDto) {
        return this.xpService.create(idUser, xpData);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an experience'})
    async update(@Param('id') id: number, @Body() xpData: ExperienceDto){
        return this.xpService.update(id, xpData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an experience'})
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.xpService.delete(id);
    }

}
