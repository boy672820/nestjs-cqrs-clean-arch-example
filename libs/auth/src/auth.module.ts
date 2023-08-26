import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
    };
  }
}
