import { AggregateRoot } from '@nestjs/cqrs';

export type CreatedHDNode = {
  phrase: string;
  publicKey: string;
  address: string;
};

export interface WalletProperties {
  userId: string;
  address: string;
  publicKey: string;
}

export class Wallet extends AggregateRoot implements WalletProperties {
  public userId: string;
  public address: string;
  public publicKey: string;

  constructor(props: WalletProperties) {
    super();
    Object.assign(this, props);
  }
}
