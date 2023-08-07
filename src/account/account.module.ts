import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';

@Module({
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
})
export class AccountModule {}
