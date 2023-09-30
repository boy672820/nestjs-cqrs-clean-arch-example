import { AggregateRoot } from '@nestjs/cqrs';
import { Account, AccountProperties } from './account';
import { HDNodeWallet } from 'ethers';
import { ulid } from 'ulid';

export interface WalletProperties {
  userId: string;
  password: string;
  phrase?: string;
}

export class Wallet extends AggregateRoot implements WalletProperties {
  public userId: string;
  public password: string;
  public publicKey: string;
  public address: string;
  public accounts: Account[] = [];

  private _phrase?: string;
  private hdnode: HDNodeWallet;

  get phrase(): string {
    return this._phrase ?? this.hdnode.mnemonic.phrase;
  }

  constructor(props: WalletProperties) {
    super();
    Object.assign(this, props);

    if (props?.phrase) {
      this._phrase = props.phrase;
      this.hdnode = HDNodeWallet.fromPhrase(props.phrase, props.password);
    } else {
      this.hdnode = HDNodeWallet.createRandom(this.password);
    }

    this.publicKey = this.hdnode.publicKey;
    this.address = this.hdnode.address;
  }

  /**
   * Add account
   *
   * @param index - Account index
   * @returns
   */
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
