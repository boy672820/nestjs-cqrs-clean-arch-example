import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { AccountRepository as CommonAccountRepository } from '@common/database/repositories';
import { Account as AccountEntity, User } from '@common/database/entities';
import { Account } from '../../domain/account';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    private readonly _accountRepository: CommonAccountRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async save(account: Account) {
    const entity = new AccountEntity();
    entity.id = account.id;
    entity.index = account.index;
    entity.accountAddress = account.accountAddress;
    entity.balance = account.balance;
    entity.user = this.entityManager.getReference(User, account.userId);

    await this.entityManager.persistAndFlush(entity);
  }
}
