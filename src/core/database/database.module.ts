import { Module, OnModuleInit, Type } from '@nestjs/common';
import { DatabaseConfigModule, DatabaseConfigService } from '@config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';

type DatabaseModuleFeatureOptions = {
  entities: Type<any>[];
};

@Module({})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly em: EntityManager) {}

  async onModuleInit() {
    try {
      await this.em.execute('SELECT 1 + 1');
    } catch (e) {
      console.error('Database connection failed');
      process.exit(1);
    }
  }

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
    };
  }

  static forFeature(options: DatabaseModuleFeatureOptions) {
    return {
      module: DatabaseModule,
      imports: [MikroOrmModule.forFeature({ entities: options.entities })],
    };
  }
}
