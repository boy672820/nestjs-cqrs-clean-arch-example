import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User as UserEntity } from '@common/database/entities';
import { User } from '../../domain/user';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string): Promise<User | null> {
    const entity = await this.em.findOne(UserEntity, id);

    if (!entity) {
      return null;
    }

    return new User({
      id: entity.id,
      otpSecret: entity.otpSecret,
    });
  }
}
