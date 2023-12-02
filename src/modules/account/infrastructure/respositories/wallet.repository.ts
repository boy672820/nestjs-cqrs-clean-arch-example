import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  Account as AccountEntity,
  Wallet as WalletEntity,
} from '@common/database/entities';
import { WalletFactory } from '../../domain';
import { Wallet } from '../../domain/wallet';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(
    private readonly em: EntityManager,
    private readonly walletFactory: WalletFactory,
  ) {}

  async create(wallet: Wallet): Promise<void> {
    const entity = this.em.create(WalletEntity, {
      ...wallet,
      accounts: undefined,
    });
    const accounts = wallet.accounts.map((account) =>
      this.em.create(AccountEntity, { ...account, wallet }),
    );
    entity.accounts.hydrate(accounts);

    await this.em.persistAndFlush(entity);
  }

  async addAccount(wallet: Wallet): Promise<void> {
    const walletRef = this.em.getReference(WalletEntity, wallet.userId);

    if (!wrap(walletRef).isInitialized()) {
      throw new Error('Wallet not found');
    }

    wallet.accounts.forEach((account) => {
      const accountRef = this.em.getReference(AccountEntity, [
        account.id,
        wallet.userId,
      ]);

      if (!wrap(accountRef).isInitialized()) {
        const accountEntity = this.em.create(AccountEntity, account);
        accountEntity.wallet = walletRef;

        walletRef.accounts.add(accountEntity);
      }
    });

    await this.em.persistAndFlush(walletRef);
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    const entity = await this.em.findOne(
      WalletEntity,
      { userId },
      { populate: ['accounts'] },
    );

    if (!entity) {
      return null;
    }

    return this.walletFactory.reconstitute({
      userId,
      accounts: entity.accounts.getItems().map((account) => ({
        id: account.id,
        userId,
        index: account.index,
        accountAddress: account.accountAddress,
        balance: account.balance,
        isLocked: account.isLocked,
        lockedAt: account.lockedAt,
      })),
    });
  }
}
