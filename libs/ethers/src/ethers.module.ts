import { DynamicModule, Module } from '@nestjs/common';
import type {
  EthersModuleAsyncOptions,
  EthersModuleRootOptions,
} from './ethers.interface';
import {
  createAlchemyProvider,
  createAlchemyProviderAsync,
  createSignerAsync,
  createSignerProvider,
} from './ethers.providers';
import { InjectionTokens } from './ethers.constants';
import { EthersService } from './ethers.service';

@Module({})
export class EthersModule {
  static forRoot(options: EthersModuleRootOptions): DynamicModule {
    return {
      module: EthersModule,
      providers: [
        createAlchemyProvider(options),
        createSignerProvider(options),
      ],
      exports: [InjectionTokens.SIGNER],
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
        {
          provide: InjectionTokens.ASYNC_OPTIONS,
          useFactory,
          inject,
        },
      ],
      imports,
      exports: [InjectionTokens.SIGNER],
      global: true,
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: EthersModule,
      providers: [EthersService],
      exports: [EthersService],
    };
  }
}
