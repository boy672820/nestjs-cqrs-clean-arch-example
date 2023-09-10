import { Injectable } from '@nestjs/common';
import { IAuthBasicService } from '@libs/auth';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@common/database/entities';

@Injectable()
export class AuthBasicService implements IAuthBasicService {
  constructor(private readonly entityManager: EntityManager) {}

  async validateUser(username: string, password: string) {
    const user = await this.entityManager.findOne<User>(User, { username });

    if (!user || user.password !== password) {
      return null;
    }

    return { id: user.id };
  }
}
