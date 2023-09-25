import { Wallet } from '../wallet';

export interface IWalletRepository {
  save: (wallet: Wallet) => Promise<void>;
}
