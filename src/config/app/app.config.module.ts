import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import configuration from './app.configuration';

@Module({
  imports: [ConfigModule.forFeature(configuration)],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
