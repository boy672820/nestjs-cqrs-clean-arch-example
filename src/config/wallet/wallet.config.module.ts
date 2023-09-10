import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletConfigService } from './wallet.config.service';
import configuration from './wallet.configuration';

@Module({
  imports: [ConfigModule.forFeature(configuration)],
  providers: [WalletConfigService],
  exports: [WalletConfigService],
})
export class WalletConfigModule {}
