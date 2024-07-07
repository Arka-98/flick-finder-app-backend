import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Flick Finder API')
    .setDescription('Flick Finder REST API specification')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
