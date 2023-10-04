import { Injectable } from '@nestjs/common';
import { Account as AccountEntity } from '@common/database/entities';
import { Account } from '../../domain/account';
import { AccountFactory } from '../../domain';
import { EntityManager } from '@mikro-orm/postgresql';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly accountFactory: AccountFactory,
  ) {}

  async findOne(id: string, userId: string): Promise<Account | null> {
    const entity = await this.entityManager.findOne(AccountEntity, [
      id,
      userId,
    ]);

    if (!entity) {
      return null;
    }

    return this.accountFactory.reconstitute({
      id: entity.id,
      userId,
      index: entity.index,
      accountAddress: entity.accountAddress,
      balance: entity.balance,
      isLocked: entity.isLocked,
    });
  }
}
