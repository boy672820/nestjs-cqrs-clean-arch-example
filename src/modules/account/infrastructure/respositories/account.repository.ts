import { Injectable } from '@nestjs/common';
import {
  Account as AccountEntity,
  History as HistoryEntity,
} from '@common/database/entities';
import { HistoryType } from '@common/database/enum';
import { EntityManager } from '@mikro-orm/postgresql';
import { wrap } from '@mikro-orm/core';
import { Account } from '../../domain/account';
import { AccountFactory } from '../../domain';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import { ulid } from 'ulid';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    private readonly em: EntityManager,
    private readonly accountFactory: AccountFactory,
  ) {}

  async findOne(id: string, userId: string): Promise<Account | null> {
    const entity = await this.em.findOne(AccountEntity, [id, userId]);

    if (!entity) {
      return null;
    }

    return this.entityToModel(entity);
  }

  async findById(id: string): Promise<Account | null> {
    const entity = await this.em.findOne(AccountEntity, { id });

    if (!entity) {
      return null;
    }

    return this.entityToModel(entity);
  }

  async update(account: Account): Promise<void> {
    const accountRef = this.em.getReference(AccountEntity, [
      account.id,
      account.userId,
    ]);

    wrap(accountRef).assign(account);

    await this.em.persistAndFlush(accountRef);
  }

  async createHistory(
    account: Account,
    recipientAccount: Account,
    amount: string,
  ): Promise<void> {
    const accountRef = this.em.getReference(AccountEntity, [
      account.id,
      account.userId,
    ]);
    const recipientAccountRef = this.em.getReference(AccountEntity, [
      recipientAccount.id,
      recipientAccount.userId,
    ]);

    const withdrawal = this.em.create(HistoryEntity, {
      id: ulid(),
      account: accountRef,
      recipientAccountId: recipientAccount.id,
      recipientUserId: recipientAccount.userId,
      amount,
      type: HistoryType.Withdrawal,
      createdAt: new Date(),
    });
    const deposit = this.em.create(HistoryEntity, {
      id: ulid(),
      account: recipientAccountRef,
      recipientAccountId: account.id,
      recipientUserId: account.userId,
      amount,
      type: HistoryType.Deposit,
      createdAt: new Date(),
    });

    await this.em.persistAndFlush([withdrawal, deposit]);
  }

  /**
   * Convert account entity to account model
   */
  private entityToModel(entity: AccountEntity): Account {
    return this.accountFactory.reconstitute({
      id: entity.id,
      userId: entity.wallet.userId,
      index: entity.index,
      accountAddress: entity.accountAddress,
      balance: entity.balance,
      isLocked: entity.isLocked,
    });
  }
}
