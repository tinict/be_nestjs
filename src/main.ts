import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const envFile = path.resolve(__dirname, '../', `.env`);
  const envConfig = dotenv.parse(fs.readFileSync(envFile));

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  app.setGlobalPrefix('api');
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useStaticAssets(path.join(__dirname, 'assets'));
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  app.useStaticAssets(path.join(__dirname, '..', 'ats'), {
    prefix: '/ats',
  });
  app.set('trust proxy', true);
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  const port = 5000;

  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Community platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
