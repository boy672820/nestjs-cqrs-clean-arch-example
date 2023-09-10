import { DynamicModule, Module, Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthBasicGuard } from './guards/auth-basic.guard';
import type { IAuthBasicService } from './auth-basic.interface';

type AuthModuleAsyncOptions = {
  useClass: Type<IAuthBasicService>;
  imports: any[];
};

@Module({})
export class AuthModule {
  static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: options.imports,
      providers: [
        { provide: APP_GUARD, useClass: AuthBasicGuard },
        {
          provide: 'AUTH_BASIC_SERVICE',
          useClass: options.useClass,
        },
      ],
    };
  }
}
