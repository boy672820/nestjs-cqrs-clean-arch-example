import type { DerivedAccount } from '../../domain/account';

export interface IWalletService {
  createAccount(index: number | bigint): DerivedAccount;
}
