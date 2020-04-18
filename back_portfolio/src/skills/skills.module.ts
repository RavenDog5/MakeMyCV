import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './skills.entity';
import { ExperienceEntity } from 'src/experience/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity, ExperienceEntity])],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule {}
