import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  classSerializerInterceptorOptions,
  portNumber,
  swaggerOptions,
  validationPipeOptions,
  versioningOptions,
} from './main.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(
      app.get(Reflector),
      classSerializerInterceptorOptions,
    ),
  );

  app.enableVersioning(versioningOptions);

  SwaggerModule.setup(
    swaggerOptions.path,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(swaggerOptions.title)
        .setVersion(swaggerOptions.version)
        .setDescription(swaggerOptions.description)
        .setLicense(swaggerOptions.license.name, swaggerOptions.license.url)
        .addBasicAuth(
          swaggerOptions.basicAuth.options,
          swaggerOptions.basicAuth.name,
        )
        .addBearerAuth(
          swaggerOptions.bearerAuth.options,
          swaggerOptions.bearerAuth.name,
        )
        .build(),
    ),
  );
  await app.listen(portNumber);
}
bootstrap();
