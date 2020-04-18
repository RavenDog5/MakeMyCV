import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder }from '@nestjs/swagger';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  application.enableCors();

  const options = new DocumentBuilder()
    .setTitle('API Portfolio')
    .setDescription('L\'API de mon portfolio !')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(application, options);
  // Pour visualiser les routes 
  SwaggerModule.setup('/docs', application, document);


  await application.listen(3020);
}
bootstrap();
