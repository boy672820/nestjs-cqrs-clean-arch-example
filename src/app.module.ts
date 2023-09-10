import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [CoreModule, AccountModule],
})
export class AppModule {}
