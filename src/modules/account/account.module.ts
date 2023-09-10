import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@common/database/entities';
import { WalletConfigModule } from '@config';
import { AccountController } from './interface';
import { AccountFactory } from './domain';
import { CreateAccountHandler } from './application';
import { WalletService } from './infrastructure';

const Factories = [AccountFactory];

const CommandHandlers = [CreateAccountHandler];

const Adapters = [WalletService];

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature({ entities: [Account] }),
    WalletConfigModule,
  ],
  providers: [...Factories, ...CommandHandlers, ...Adapters],
  controllers: [AccountController],
})
export class AccountModule {}
