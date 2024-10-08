import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';

import { AuthModule } from './module/auth/auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserRole } from './module/user/enums/role.enum';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import MongoExceptionFilter from './common/service/mongo-exception.filter';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Task') //the title you want for your swagger docs
    .setDescription('Task Product') //description
  //description
    .setVersion('1.0') //version setting for the docs
    .setDescription('Foydalanuvchi rollari: ' + Object.values(UserRole).join(', '))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, UserModule,ProductModule], //the modules that you want to include in your swagger docs
  });
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  app.use(cors());
  app.use('/files', express.static(path.join(__dirname, '..', 'files')))
  app.use('/files', express.static(path.join(__dirname, './files')))
  app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(3000);
}
bootstrap();
