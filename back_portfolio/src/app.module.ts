import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';
import { UtilsModule } from './utils/utils.module';
import { FormationModule } from './formation/formation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 5540,
      username: 'TheDevil',
      password: '!Luci666',
      database: 'portfolio',
      entities: [__dirname + "/**/**.entity{.ts,.js}"],
      synchronize: true
    }),
    UserModule,
    SkillsModule,
    FormationModule,
    ExperienceModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
