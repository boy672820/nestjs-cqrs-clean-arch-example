import { DynamicModule, Module } from '@nestjs/common';
import type { EthersModuleRootOptions } from './ethers.interface';
import {
  createAlchemyProvider,
  createSignerProvider,
} from './ethers.providers';

@Module({})
export class EthersModule {
  static forRoot(options: EthersModuleRootOptions): DynamicModule {
    return {
      module: EthersModule,
      providers: [
        createAlchemyProvider({
          network: options.network,
          alchemy: options.alchemy,
        }),
        createSignerProvider({
          phrase: options.phrase,
          password: options.password,
        }),
      ],
    };
  }
}
