import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@common/database/entities';
import {
  Account2FaController,
  AccountController,
  WalletController,
} from './interface';
import { AccountFactory, WalletFactory } from './domain';
import {
  AddAccountUnsafeHandler,
  CreateWalletHandler,
  GenerateSecretHandler,
  LockAccountHandler,
  OpenAccountHandler,
  TransferHandler,
} from './application';
import {
  AccountRepository,
  AuthenticatorService,
  WalletRepository,
} from './infrastructure';
import { InjectionToken } from './account.constants';

const Factories = [WalletFactory, AccountFactory];

const CommandHandlers = [
  CreateWalletHandler,
  AddAccountUnsafeHandler,
  LockAccountHandler,
  OpenAccountHandler,
  TransferHandler,
  GenerateSecretHandler,
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

const Adapters = [AuthenticatorService];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({ entities: [Account] })],
  providers: [...Factories, ...CommandHandlers, ...Repositories, ...Adapters],
  controllers: [WalletController, AccountController, Account2FaController],
})
export class AccountModule {}
