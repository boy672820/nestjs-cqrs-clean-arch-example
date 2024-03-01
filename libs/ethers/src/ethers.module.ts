import { DynamicModule, Module } from '@nestjs/common';
import type {
  EthersModuleAsyncOptions,
  EthersModuleRootOptions,
} from './ethers.interface';
import {
  createAlchemyProvider,
  createAlchemyProviderAsync,
  createContractAsync,
  createContractProvider,
  createSignerAsync,
  createSignerProvider,
} from './ethers.providers';
import { InjectionTokens } from './ethers.constants';
import { TokenContract, TokenContractImpl } from './token.contract';

@Module({})
export class EthersModule {
  static forRoot(options: EthersModuleRootOptions): DynamicModule {
    return {
      module: EthersModule,
      providers: [
        createAlchemyProvider(options),
        createSignerProvider(options),
        createContractProvider(options),
      ],
      exports: [InjectionTokens.BASE_CONTRACT],
      global: true,
    };
  }

  static forRootAsync({
    useFactory,
    inject,
    imports,
  }: EthersModuleAsyncOptions): DynamicModule {
    return {
      module: EthersModule,
      providers: [
        createAlchemyProviderAsync(),
        createSignerAsync(),
        createContractAsync(),
        {
          provide: InjectionTokens.ASYNC_OPTIONS,
          useFactory,
          inject,
        },
      ],
      imports,
      exports: [InjectionTokens.BASE_CONTRACT],
      global: true,
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: EthersModule,
      providers: [
        {
          provide: TokenContract,
          useClass: TokenContractImpl,
        },
      ],
      exports: [TokenContract],
    };
  }
}
