import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@common/database/entities';
import { AccountController, WalletController } from './interface';
import { WalletFactory } from './domain';
import { AddAccountUnsafeHandler, CreateWalletHandler } from './application';
import { WalletRepository } from './infrastructure';
import { InjectionToken } from './account.constants';

const Factories = [WalletFactory];

const CommandHandlers = [CreateWalletHandler, AddAccountUnsafeHandler];

const Repositories = [
  {
    provide: InjectionToken.WALLET_REPOSITORY,
    useClass: WalletRepository,
  },
];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({ entities: [Account] })],
  providers: [...Factories, ...CommandHandlers, ...Repositories],
  controllers: [WalletController, AccountController],
})
export class AccountModule {}
