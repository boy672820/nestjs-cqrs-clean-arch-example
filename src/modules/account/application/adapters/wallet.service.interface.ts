import type { CreatedHDNode } from '../../domain/wallet';
import type { DerivedChild } from '../../domain/account';

export interface IWalletService {
  /**
   * Create a wallet
   *
   * @param password - The password to encrypt the wallet
   * @returns The created wallet
   */
  createHDNode(password: string): CreatedHDNode;

  /**
   * Derive a child from a phrase
   *
   * @param phrase - The phrase to derive the child from
   * @param index - The index of the child
   * @returns The derived child
   */
  derive(phrase: string, index: number): DerivedChild;
}
