import { BadRequestException, Injectable } from '@nestjs/common';
import { WithdrawDto } from './interface/dto/withdraw.dto';
import { AccountRepository } from './account.repository';
import { Receipt } from '../db/receipts';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async withdraw(
    accountId: string,
    accountNumber: string,
    dto: WithdrawDto,
  ): Promise<Receipt> {
    const account = await this.accountRepository.findById(accountId);

    if (account.balance < dto.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const destination = await this.accountRepository.findUnique(accountNumber);

    if (!destination) {
      throw new BadRequestException('Invalid account number');
    }

    await Promise.all([
      this.accountRepository.update(accountId, {
        balance: account.balance - dto.amount,
      }),
      this.accountRepository.update(destination.id, {
        balance: destination.balance + dto.amount,
      }),
    ]);

    return this.accountRepository.createReceipt({
      fromAccountNumber: account.accountNumber,
      toAccountNumber: destination.accountNumber,
      amount: dto.amount,
      createdAt: new Date(),
    });
  }
}
