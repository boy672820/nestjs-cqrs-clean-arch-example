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
  TransferHandler,
  Verify2faTokenHandler,
} from './application';
import {
  AccountRepository,
  AuthenticatorService,
  UserRepository,
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
  Verify2faTokenHandler,
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
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepository,
  },
];

const Adapters = [
  { provide: InjectionToken.AUTHENTICATOR, useClass: AuthenticatorService },
];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({ entities: [Account] })],
  providers: [...Factories, ...CommandHandlers, ...Repositories, ...Adapters],
  controllers: [WalletController, AccountController],
})
export class AccountModule {}
