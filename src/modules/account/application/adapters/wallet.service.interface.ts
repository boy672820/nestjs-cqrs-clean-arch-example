import type { CreatedHDNode } from '../../domain/wallet';

export interface IWalletService {
  /**
   * Create a wallet
   *
   * @param password - The password to encrypt the wallet
   * @returns The created wallet
   */
  createHDNode(password: string): CreatedHDNode;
}
