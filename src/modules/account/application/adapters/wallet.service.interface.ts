import type { CreatedWallet } from '../../domain/account';

export interface IWalletService {
  /**
   * Create a wallet
   *
   * @param password - The password to encrypt the wallet
   * @returns The created wallet
   */
  createWallet(password: string): CreatedWallet;
}
