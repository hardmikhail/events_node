import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('HTTP_PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configSwagger = new DocumentBuilder()
    .setTitle('Events service')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(
    `${configService.getOrThrow('HTTP_PREFIX')}/docs`,
    app,
    document,
  );
  await app.listen(PORT);
}
bootstrap();
