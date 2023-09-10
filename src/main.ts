import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
