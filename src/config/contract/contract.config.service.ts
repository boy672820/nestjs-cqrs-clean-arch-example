import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `contract.${key}`;

@Injectable()
export class ContractConfigService {
  constructor(private readonly config: ConfigService) {}

  get address(): string {
    return this.config.get(prefix('address'));
  }

  get abi(): Array<Record<string, string | boolean>> {
    return this.config.get(prefix('abi'));
  }
}
