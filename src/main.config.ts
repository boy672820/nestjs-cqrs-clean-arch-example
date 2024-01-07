import {
  ClassSerializerInterceptorOptions,
  ValidationPipeOptions,
  VersioningOptions,
  VersioningType,
} from '@nestjs/common';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface SwaggerOptions {
  path: string;
  title: string;
  version: string;
  description: string;
  license: {
    name: string;
    url: string;
  };
  basicAuth: {
    options?: SecuritySchemeObject;
    name?: string;
  };
  bearerAuth: {
    options?: SecuritySchemeObject;
    name?: string;
  };
}

export const portNumber = 3000;

export const versioningOptions: VersioningOptions = {
  type: VersioningType.URI,
  defaultVersion: '1',
};

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
};

export const classSerializerInterceptorOptions: ClassSerializerInterceptorOptions =
  { excludeExtraneousValues: true };

export const swaggerOptions: SwaggerOptions = {
  path: 'docs',
  title: 'NestJS Clean Architecture with CQRS',
  version: '1.0',
  description:
    'The API description for the NestJS Clean Architecture with CQRS',
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
  basicAuth: {
    options: {
      type: 'http',
      scheme: 'basic',
    },
    name: 'signed-basic',
  },
  bearerAuth: {
    options: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    name: 'signed-token',
  },
};
