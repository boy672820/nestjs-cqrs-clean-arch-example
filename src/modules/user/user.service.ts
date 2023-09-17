import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../common/database/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ulid } from 'ulid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(dto: CreateUserDto) {
    const id = ulid();
    const user = this.userRepository.create({
      ...dto,
      id,
      createdAt: new Date(),
    });
    await this.entityManager.persistAndFlush(user);
  }
}
