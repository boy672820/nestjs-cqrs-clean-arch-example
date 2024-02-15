import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `coinbase.${key}`;

@Injectable()
export class CoinbaseConfigService {
  constructor(private readonly config: ConfigService) {}

  get phrase(): string {
    return this.config.get(prefix('phrase'));
  }
  get password(): string {
    return this.config.get(prefix('password'));
  }
  get network(): 'mainnet' | 'sepolia' {
    return this.config.get(prefix('network'));
  }
  get alchemyKey(): string {
    return this.config.get(prefix('alchemyKey'));
  }
}
