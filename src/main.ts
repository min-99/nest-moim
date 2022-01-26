import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors.
  app.enableCors();

  // global exception filter.
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger.
  const config = new DocumentBuilder()
    .setTitle('API for react-moim')
    .setDescription('API list for react-moim')
    .setVersion('1.0')
    .addTag('moim')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
