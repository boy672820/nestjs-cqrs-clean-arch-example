import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule],
})
export class CoreModule {}
