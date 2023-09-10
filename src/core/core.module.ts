import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@libs/auth';
import { AuthBasicService, DatabaseModule } from './database';
import { validate } from './env.validator';
import { User } from '@common/database/entities';

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
  ],
})
export class CoreModule {}
