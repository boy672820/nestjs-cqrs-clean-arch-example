import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `app.${key}`;

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get serviceName(): string {
    return this.config.get(prefix('serviceName'));
  }

  get jwtSecret(): string {
    return this.config.get(prefix('jwtSecret'));
  }
}
