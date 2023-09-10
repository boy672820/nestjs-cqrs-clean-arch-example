import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoinbaseConfigService } from './coinbase.config.service';
import configuration from './coinbase.configuration';

@Module({
  imports: [ConfigModule.forFeature(configuration)],
  providers: [CoinbaseConfigService],
  exports: [CoinbaseConfigService],
})
export class CoinbaseConfigModule {}
