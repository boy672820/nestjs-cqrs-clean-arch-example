import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@libs/auth';
import { AuthBasicService, DatabaseModule } from './database';
import { validate } from './env.validator';
import { User } from '@common/database/entities';
import { EthersModule } from '@libs/ethers';
import {
  CoinbaseConfigModule,
  CoinbaseConfigService,
  ContractConfigModule,
  ContractConfigService,
} from '../config';

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
      useFactory: (
        coinbaseConfig: CoinbaseConfigService,
        contractConfig: ContractConfigService,
      ) => ({
        network: coinbaseConfig.network,
        alchemy: coinbaseConfig.alchemyKey,
        phrase: coinbaseConfig.phrase,
        password: coinbaseConfig.password,
        address: contractConfig.address,
        abi: contractConfig.abi,
      }),
      inject: [CoinbaseConfigService, ContractConfigService],
      imports: [CoinbaseConfigModule, ContractConfigModule],
    }),
  ],
})
export class CoreModule {}
