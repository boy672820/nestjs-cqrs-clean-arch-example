import { Account } from '../account';
import { Wallet } from '../wallet';

export interface IWalletRepository {
  save: (wallet: Wallet) => Promise<void>;
  addAccount: (wallet: Wallet, account: Account) => Promise<void>;
}
