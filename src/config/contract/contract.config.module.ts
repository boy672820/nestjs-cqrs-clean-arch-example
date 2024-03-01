import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './contract.configuration';
import { ContractConfigService } from './contract.config.service';

@Module({
  imports: [ConfigModule.forFeature(configuration)],
  providers: [ContractConfigService],
  exports: [ContractConfigService],
})
export class ContractConfigModule {}
