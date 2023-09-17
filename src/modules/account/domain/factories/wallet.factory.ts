import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Wallet, WalletProperties } from '../wallet';

@Injectable()
export class WalletFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(props: Omit<WalletProperties, 'createdAt'>): Wallet {
    return this.eventPublisher.mergeObjectContext(
      new Wallet({ ...props, createdAt: new Date() }),
    );
  }
}
