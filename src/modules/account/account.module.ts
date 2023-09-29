import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@common/database/entities';
import { AccountController } from './interface';
import { WalletFactory } from './domain';
import { CreateAccountHandler, CreateWalletHandler } from './application';
import { WalletRepository } from './infrastructure';
import { InjectionToken } from './account.constants';

const Factories = [WalletFactory];

const CommandHandlers = [CreateWalletHandler, CreateAccountHandler];

const Repositories = [
  {
    provide: InjectionToken.ACCOUNT_REPOSITORY,
    useClass: WalletRepository,
  },
];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({ entities: [Account] })],
  providers: [...Factories, ...CommandHandlers, ...Repositories],
  controllers: [AccountController],
})
export class AccountModule {}
