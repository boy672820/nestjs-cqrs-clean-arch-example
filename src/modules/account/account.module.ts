import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@common/database/entities';
import { AccountController, WalletController } from './interface';
import { AccountFactory, WalletFactory } from './domain';
import {
  AddAccountUnsafeHandler,
  CreateWalletHandler,
  LockAccountHandler,
  OpenAccountHandler,
} from './application';
import { AccountRepository, WalletRepository } from './infrastructure';
import { InjectionToken } from './account.constants';

const Factories = [WalletFactory, AccountFactory];

const CommandHandlers = [
  CreateWalletHandler,
  AddAccountUnsafeHandler,
  LockAccountHandler,
  OpenAccountHandler,
];

const Repositories = [
  {
    provide: InjectionToken.WALLET_REPOSITORY,
    useClass: WalletRepository,
  },
  {
    provide: InjectionToken.ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({ entities: [Account] })],
  providers: [...Factories, ...CommandHandlers, ...Repositories],
  controllers: [WalletController, AccountController],
})
export class AccountModule {}
