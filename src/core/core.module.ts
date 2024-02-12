import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@libs/auth';
import { AuthBasicService, DatabaseModule } from './database';
import { validate } from './env.validator';
import { User } from '@common/database/entities';
import { EthersModule } from '@libs/ethers';

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
    EthersModule.forRoot({
      network: 'sepolia',
      alchemy: 'https://eth-mainnet.alchemyapi.io/v2/your-api-key',
      phrase: 'your-12-word-phrase',
    }),
  ],
})
export class CoreModule {}
