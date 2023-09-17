import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../common/database/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
