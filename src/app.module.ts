import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreModule, AccountModule, UserModule],
})
export class AppModule {}
