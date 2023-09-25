import { AggregateRoot } from '@nestjs/cqrs';
import { Account, AccountProperties } from './account';
import { HDNodeWallet } from 'ethers';
import { ulid } from 'ulid';

export interface WalletProperties {
  userId: string;
  password: string;
}

export class Wallet extends AggregateRoot implements WalletProperties {
  public userId: string;
  public password: string;
  public publicKey: string;
  public address: string;
  public accounts: Account[] = [];

  private hdnode: HDNodeWallet;

  get phrase(): string {
    return this.hdnode.mnemonic.phrase;
  }

  constructor(props: WalletProperties) {
    super();
    Object.assign(this, props);

    this.hdnode = HDNodeWallet.createRandom(this.password);
    this.publicKey = this.hdnode.publicKey;
    this.address = this.hdnode.address;
  }

  addAccount(index: number): AccountProperties & { privkey: string } {
    const child = this.hdnode.deriveChild(index);
    const props = {
      id: ulid(),
      index,
      accountAddress: child.address,
      balance: '0',
    };
    this.accounts.push(new Account(props));

    return { ...props, privkey: child.privateKey };
  }
}
