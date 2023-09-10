import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `wallet.${key}`;

@Injectable()
export class WalletConfigService {
  constructor(private readonly config: ConfigService) {}

  get phrase(): string {
    return this.config.get(prefix('phrase'));
  }
  get password(): string {
    return this.config.get(prefix('password'));
  }
}
