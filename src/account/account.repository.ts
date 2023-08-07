import { Injectable } from '@nestjs/common';
import { Account, accounts } from '../db/accounts';
import { Receipt, receipts } from '../db/receipts';

@Injectable()
export class AccountRepository {
  findById(id: string): Promise<Account | null> {
    return Promise.resolve(
      accounts.find((account) => account.id === id) || null,
    );
  }

  findUnique(accountNumber: string): Promise<Account | null> {
    return Promise.resolve(
      accounts.find((account) => account.accountNumber === accountNumber) ||
        null,
    );
  }

  update(
    accountId: string,
    fields: Partial<Omit<Account, 'id'>>,
  ): Promise<void> {
    const account = accounts.find((account) => account.id === accountId);
    if (!account) {
      return Promise.reject(new Error('Account not found'));
    }

    Object.assign(account, fields);
    return Promise.resolve();
  }

  createReceipt(input: Omit<Receipt, 'id'>): Promise<Receipt> {
    // id는 랜덤한 문자열로 생성합니다.
    const newReceipt: Receipt = {
      id: Math.random().toString(36).substring(2, 9),
      ...input,
    };
    receipts.push(newReceipt);
    return Promise.resolve(newReceipt);
  }
}
