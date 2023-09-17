import { AggregateRoot } from '@nestjs/cqrs';

export type CreatedHDNode = {
  phrase: string;
  address: string;
  publicKey: string;
  child: {
    index: number;
    address: string;
    privkey: string;
  };
};

export interface WalletProperties {
  id: string;
  userId: string;
  address: string;
  publicKey: string;
  createdAt: Date;
}

export class Wallet extends AggregateRoot implements WalletProperties {
  public id: string;
  public userId: string;
  public address: string;
  public publicKey: string;
  public createdAt: Date;

  constructor(props: WalletProperties) {
    super();
    Object.assign(this, props);
  }
}
