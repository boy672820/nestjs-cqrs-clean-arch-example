import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseConfigModule, DatabaseConfigService } from '@config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (databaseConfig: DatabaseConfigService) => ({
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        type: 'postgresql',
        host: databaseConfig.host,
        port: databaseConfig.port,
        user: databaseConfig.user,
        password: databaseConfig.password,
        dbName: databaseConfig.name,
        schema: databaseConfig.schema,
      }),
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
    }),
  ],
})
export class DatabaseModule {}
