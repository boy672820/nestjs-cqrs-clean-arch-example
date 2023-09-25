import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  Account as AccountEntity,
  Wallet as WalletEntity,
} from '@common/database/entities';
import { Wallet } from '../../domain/wallet';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async save(wallet: Wallet): Promise<void> {
    const entity = this.entityManager.create(WalletEntity, wallet);
    wallet.accounts.forEach((account) => {
      entity.accounts.add(this.entityManager.create(AccountEntity, account));
    });

    await this.entityManager.persistAndFlush(entity);
  }
}
