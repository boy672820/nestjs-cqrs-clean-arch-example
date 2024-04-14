import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppConfigModule, AppConfigService } from '@config';
import { Account } from '@common/database/entities';
import { EthersModule } from '@libs/ethers';
import { AccountController, WalletController } from './interface';
import { AccountFactory, TransactionFactory, WalletFactory } from './domain';
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
  UserRepository,
  WalletRepository,
  AuthenticatorService,
  ContractService,
  TransactionRepository,
} from './infrastructure';
import { InjectionToken } from './account.constants';

const Factories = [WalletFactory, AccountFactory, TransactionFactory];

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
  {
    provide: InjectionToken.TRANSACTION_REPOSITORY,
    useClass: TransactionRepository,
  },
];

const Adapters = [
  { provide: InjectionToken.AUTHENTICATOR, useClass: AuthenticatorService },
  { provide: InjectionToken.CONTRACT_SERVICE, useClass: ContractService },
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
        signOptions: { expiresIn: config.jwtExpiresIn },
      }),
      inject: [AppConfigService],
    }),
    EthersModule.forFeature(),
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
