import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `app.${key}`;

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get otpService(): string {
    return this.config.get(prefix('otpService'));
  }
}
