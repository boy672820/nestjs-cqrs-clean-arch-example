import { AggregateRoot } from '@nestjs/cqrs';
import { Account, AccountProperties } from './account';
import { WalletCreatedEvent } from './events/wallet-created.event';
import { HDNodeWallet } from 'ethers';
import { ulid } from 'ulid';

export interface WalletProperties {
  userId: string;
  publicKey: string;
  address: string;
  accounts: Account[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateWalletProperties
  extends Pick<WalletProperties, 'userId'> {}

export interface ReconstituteWalletProperties extends CreateWalletProperties {
  accounts: AccountProperties[];
}

/**
 * Check HDNodeWallet method decorator
 */
function CheckHDNode() {
  return function (
    _target: Wallet,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!this.hdnode) {
        throw new Error('HDNode not initialized');
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export class Wallet extends AggregateRoot implements WalletProperties {
  public userId: string;
  public publicKey: string;
  public address: string;
  public accounts: Account[] = [];

  private hdnode: HDNodeWallet;

  constructor(props: CreateWalletProperties) {
    super();
    Object.assign(this, props);
  }

  /**
   * Create random HDNode
   *
   * @param password - Password
   * @returns Mnemonic phrase
   */
  createHDNode(password: string): string {
    if (this.hdnode) {
      throw new Error('HDNode already initialized');
    }

    const hdnode = HDNodeWallet.createRandom(password);
    this.hdnode = hdnode;
    this.publicKey = hdnode.publicKey;
    this.address = hdnode.address;

    this.apply(new WalletCreatedEvent(this.userId));

    return hdnode.mnemonic.phrase;
  }

  /**
   * Initialize HDNode
   *
   * @param phrase - Mnemonic phrase
   * @param password - Password
   */
  initialize(phrase: string, password: string): void {
    const hdnode = HDNodeWallet.fromPhrase(phrase, password);
    this.hdnode = hdnode;
    this.publicKey = hdnode.publicKey;
    this.address = hdnode.address;
  }

  /**
   * Add account
   *
   * @returns Account properties with private key
   */
  @CheckHDNode()
  addAccount(): AccountProperties & { privkey: string } {
    const index = this.accounts.length;
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
