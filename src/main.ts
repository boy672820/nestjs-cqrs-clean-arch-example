import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('NestJS Clean Architecture with CQRS')
        .setVersion('1.0')
        .setDescription(
          'The API description for the NestJS Clean Architecture with CQRS',
        )
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addBasicAuth()
        .build(),
    ),
  );
  await app.listen(3000);
}
bootstrap();
