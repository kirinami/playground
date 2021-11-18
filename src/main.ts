import '../env.config';

import 'reflect-metadata';

import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import path from 'path';

import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: process.env.NODE_ENV !== 'production',
  });

  app.useStaticAssets(path.resolve('./runtime/uploads'), {
    prefix: '/uploads/',
    index: false,
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Todos API')
        .setDescription('The Todos API documentation')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build(),
    ), {
      customSiteTitle: 'Todos API',
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
}

main()
  .catch(console.error);
