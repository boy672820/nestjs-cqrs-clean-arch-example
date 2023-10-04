import { Wallet } from '../wallet';

export interface IWalletRepository {
  /**
   * Create wallet
   *
   * @param wallet - Wallet
   * @returns Promise
   */
  create: (wallet: Wallet) => Promise<void>;

  /**
   * Add account to wallet
   *
   * Detects if new account exists and adds it to the wallet
   * If account exists, it will be ignored
   * Wallet not found error will be thrown if wallet not exists
   *
   * @param wallet - Wallet
   * @returns Promise
   */
  addAccount: (wallet: Wallet) => Promise<void>;

  /**
   * Find wallet by user id
   *
   * @param userId - User id
   * @returns Promise
   */
  findByUserId: (userId: string) => Promise<Wallet | null>;
}
