import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      type: 'postgresql',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '123',
      dbName: 'psotgres',
    }),
  ],
})
export class DatabaseModule {}
