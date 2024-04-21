import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { Transactional } from '@common/database/decorators';
import { TransactionStatus } from '@common/database/enum';
import { WithdrawCommand } from './withdraw.command';
import { TransactionFactory } from '../../domain';
import { InjectionToken } from '../../account.constants';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import type { ITransactionRepository } from '../../domain/repositories/transaction.repository.interface';
import type { IContractService } from '../adapters/contract.service.interface';

@CommandHandler(WithdrawCommand)
export class WithdrawHandler extends CommandHandlerAbstract<WithdrawCommand> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    @Inject(InjectionToken.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    @Inject(InjectionToken.CONTRACT_SERVICE)
    private readonly contractService: IContractService,
    private readonly transactionFactory: TransactionFactory,
  ) {
    super();
  }

  @Transactional()
  async execute(command: WithdrawCommand) {
    const { userId, accountId, amount, destAddress } = command;

    const account = await this.accountRepository.findOne(accountId, userId);

    account.withdraw(amount);

    const tx = await this.contractService.transfer(destAddress, amount);

    const transaction = this.transactionFactory.create({
      hash: tx.hash,
      nonce: tx.nonce,
      status: TransactionStatus.Pending,
      from: account.accountAddress,
      to: destAddress,
      gasLimit: tx.gasLimit,
    });

    await this.transactionRepository.create(transaction);
  }
}
