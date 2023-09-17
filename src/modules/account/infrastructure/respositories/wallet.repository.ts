import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Wallet } from '../../domain/wallet';
import type { IWalletRepository } from '../../domain/repositories/wallet.repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async save(wallet: Wallet): Promise<void> {
    const entity = this.toEntity(wallet);
    await this.entityManager.persistAndFlush(entity);
  }

  toEntity(wallet: Wallet) {
    const serialized = JSON.parse(JSON.stringify(wallet));
    return this.entityManager.create(Wallet, serialized);
  }
}
