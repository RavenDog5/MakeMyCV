import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Utils')
@Controller('utils')
export class UtilsController {


    constructor(private readonly utilsService: UtilsService) { }

    @Get('address/:address')
    async getAdresse(@Param('address') adresse: string): Promise<any> {
        return this.utilsService.getAdresse(adresse);
    }

    @Get('password')
    getPassword(): Promise<any> {
        return this.utilsService.getPassword();
    }
}
