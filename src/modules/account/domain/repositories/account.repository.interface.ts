import { Account } from '../account';

export interface IAccountRepository {
  /**
   * Save account
   *
   * @param account Account
   */
  save(account: Account): Promise<void>;
}
