import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Wallet,
  type ReconstituteWalletProperties,
  type CreateWalletProperties,
} from '../wallet';
import { Account } from '../account';

@Injectable()
export class WalletFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  /**
   * Create wallet
   *
   * @param props - Wallet properties
   * @returns Wallet
   */
  create(props: CreateWalletProperties): Wallet {
    return this.eventPublisher.mergeObjectContext(new Wallet(props));
  }

  /**
   * Reconstitute wallet
   *
   * @param props - Wallet properties
   * @returns Wallet
   */
  reconstitute(props: ReconstituteWalletProperties): Wallet {
    const wallet = this.eventPublisher.mergeObjectContext(new Wallet(props));
    wallet.accounts = props.accounts.map((account) =>
      this.eventPublisher.mergeObjectContext(new Account(account)),
    );

    return wallet;
  }
}
