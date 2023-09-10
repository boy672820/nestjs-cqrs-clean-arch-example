import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@common/database/entities';
import { AccountController } from './interface';
import { AccountFactory } from './domain';
import { CreateWalletHandler } from './application';
import { AccountRepository, WalletService } from './infrastructure';
import { InjectionToken } from './account.constants';

const Factories = [AccountFactory];

const CommandHandlers = [CreateWalletHandler];

const Repositories = [
  {
    provide: InjectionToken.ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
];
const Adapters = [
  {
    provide: InjectionToken.WALLET_SERVICE,
    useClass: WalletService,
  },
];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({ entities: [Account] })],
  providers: [...Factories, ...CommandHandlers, ...Repositories, ...Adapters],
  controllers: [AccountController],
})
export class AccountModule {}
