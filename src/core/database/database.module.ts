import { Module, Type } from '@nestjs/common';
import { DatabaseConfigModule, DatabaseConfigService } from '@config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseHealthIndicator } from './database.health-indicator';

type DatabaseModuleFeatureOptions = {
  entities: Type<any>[];
};

@Module({})
export class DatabaseModule {
  static forRoot() {
    return {
      module: DatabaseModule,
      imports: [
        MikroOrmModule.forRootAsync({
          useFactory: (databaseConfig: DatabaseConfigService) => ({
            type: 'postgresql',
            host: databaseConfig.host,
            port: databaseConfig.port,
            user: databaseConfig.user,
            password: databaseConfig.password,
            dbName: databaseConfig.name,
            schema: databaseConfig.schema,
            autoLoadEntities: true,
            discovery: {
              warnWhenNoEntities: false,
            },
          }),
          imports: [DatabaseConfigModule],
          inject: [DatabaseConfigService],
        }),
      ],
      providers: [DatabaseHealthIndicator],
    };
  }

  static forFeature(options: DatabaseModuleFeatureOptions) {
    return {
      module: DatabaseModule,
      imports: [MikroOrmModule.forFeature({ entities: options.entities })],
    };
  }
}
