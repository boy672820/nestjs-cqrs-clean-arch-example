import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppConfigModule, AppConfigService } from '@config';
import { Account } from '@common/database/entities';
import { AccountController, WalletController } from './interface';
import { AccountFactory, WalletFactory } from './domain';
import {
  AccountSaga,
  AddAccountUnsafeHandler,
  CreateHistoryHandler,
  CreateWalletHandler,
  LockAccountHandler,
  OpenAccountHandler,
  TransferHandler,
  Verify2faTokenHandler,
  WithdrawHandler,
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
  WithdrawHandler,
  Verify2faTokenHandler,
  CreateHistoryHandler,
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
  imports: [
    AppConfigModule,
    CqrsModule,
    MikroOrmModule.forFeature({ entities: [Account] }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: '3m' },
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [
    ...Factories,
    ...CommandHandlers,
    ...Repositories,
    ...Adapters,
    AccountSaga,
  ],
  controllers: [WalletController, AccountController],
})
export class AccountModule {}
