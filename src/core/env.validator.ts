import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Enviroment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum EnvKey {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',

  MONGO_ENGINE = 'MONGO_ENGINE',
  MONGO_HOST = 'MONGO_HOST',
  MONGO_PORT = 'MONGO_PORT',
  MONGO_USER = 'MONGO_USER',
  MONGO_PASSWORD = 'MONGO_PASSWORD',
  MONGO_DATABASE = 'MONGO_DATABASE',
}

class EnviromentVariables {
  @IsEnum(Enviroment)
  NODE_ENV: Enviroment;
  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: number;
  @IsString()
  DATABASE_USER: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_SCHEMA: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnviromentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
