import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config';
import { User } from '@common/database/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] }), AppConfigModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
