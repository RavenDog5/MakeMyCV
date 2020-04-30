import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationEntity } from './formation.entity';
import { FormationService } from './formation.service';
import { UserEntity } from 'src/user/user.entity';
import { FormationController } from './formation.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FormationEntity, UserEntity])],
    controllers: [FormationController],
    providers: [FormationService]
})
export class FormationModule {}
