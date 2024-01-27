import { Account } from '../account';

export interface IAccountRepository {
  /**
   * Find one account by id
   *
   * Id is a combination of user id and account id
   *
   * @param id - Account id
   * @param userId - User id
   * @returns Promise with account or null
   */
  findOne: (id: string, userId: string) => Promise<Account | null>;

  /**
   * Find one account by only id
   *
   * @param id - Account id
   * @returns Promise with account or null
   */
  findById: (id: string) => Promise<Account | null>;

  /**
   * Update account
   *
   * If account is not found, do nothing
   *
   * @param account - Account
   */
  update(account: Account): Promise<void>;

  /**
   * Create history
   *
   * @param fromAccount - From account
   * @param toAccount - To account
   * @param amount - Amount
   */
  createHistory: (
    account: Account,
    recipientAccount: Account,
    amount: string,
  ) => Promise<void>;
}
