import { Module } from '@nestjs/common';
import { AccountController } from './interface/account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
})
export class AccountModule {}
