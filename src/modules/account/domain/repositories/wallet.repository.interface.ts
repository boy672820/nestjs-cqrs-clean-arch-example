import { Wallet } from '../wallet';

export interface IWalletRepository {
  /**
   * Save wallet
   *
   * @param wallet - Wallet
   * @returns Promise
   */
  save: (wallet: Wallet) => Promise<void>;

  /**
   * Find wallet by user id
   *
   * @param userId - User id
   * @returns Promise
   */
  findByUserId: (userId: string) => Promise<Wallet | null>;
}
