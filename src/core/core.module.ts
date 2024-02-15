import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@libs/auth';
import { AuthBasicService, DatabaseModule } from './database';
import { validate } from './env.validator';
import { User } from '@common/database/entities';
import { EthersModule } from '@libs/ethers';
import { CoinbaseConfigModule, CoinbaseConfigService } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(),
    AuthModule.forRootAsync({
      useClass: AuthBasicService,
      imports: [
        DatabaseModule.forRoot(),
        DatabaseModule.forFeature({ entities: [User] }),
      ],
    }),
    EthersModule.forRootAsync({
      useFactory: (config: CoinbaseConfigService) => ({
        network: config.network,
        alchemy: config.alchemyKey,
        phrase: config.phrase,
        password: config.password,
      }),
      inject: [CoinbaseConfigService],
      imports: [CoinbaseConfigModule],
    }),
  ],
})
export class CoreModule {}
