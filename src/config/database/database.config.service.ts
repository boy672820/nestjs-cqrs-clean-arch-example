import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `database.${key}`;

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly config: ConfigService) {}

  get host(): string {
    return this.config.get(prefix('host'));
  }
  get port(): number {
    return Number(this.config.get(prefix('port')));
  }
  get user(): string {
    return this.config.get(prefix('user'));
  }
  get password(): string {
    return this.config.get(prefix('password'));
  }
  get name(): string {
    return this.config.get(prefix('name'));
  }
  get schema(): string {
    return this.config.get(prefix('schema'));
  }
}
