import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './experience.entity';
// import { SkillEntity } from 'src/skills/skills.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports :[TypeOrmModule.forFeature([ExperienceEntity, UserEntity])],
  controllers: [ExperienceController],
  providers: [ExperienceService]
})
export class ExperienceModule {}
