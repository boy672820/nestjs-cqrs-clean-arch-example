import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './database.config.service';
import configuration from './database.configuration';

@Module({
  imports: [ConfigModule.forFeature(configuration)],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
