import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  Account as AccountEntity,
  Wallet as WalletEntity,
} from '@common/database/entities';
import { Wallet } from '../../domain/wallet';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';
import { WalletFactory } from '../../domain';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly walletFactory: WalletFactory,
  ) {}

  async save(wallet: Wallet): Promise<void> {
    const entity = this.entityManager.create(WalletEntity, wallet);
    wallet.accounts.forEach((account) => {
      entity.accounts.add(this.entityManager.create(AccountEntity, account));
    });

    await this.entityManager.persistAndFlush(entity);
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    const entity = await this.entityManager.findOne(
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
        index: account.index,
        accountAddress: account.accountAddress,
        balance: account.balance,
      })),
    });
  }
}
