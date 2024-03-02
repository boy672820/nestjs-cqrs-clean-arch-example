import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  BaseContract,
  BaseContractMethod,
  ContractTransactionResponse,
} from 'ethers';
import { InjectionTokens } from './ethers.constants';
import { TokenContract } from './token.contract.abstract';

export class TokenContractImpl
  implements TokenContract, OnApplicationBootstrap
{
  constructor(
    @Inject(InjectionTokens.BASE_CONTRACT)
    private readonly contract: BaseContract,
    private eventEmitter: EventEmitter2,
  ) {}

  onApplicationBootstrap() {
    this.contract.on('Transfer', (from, to, value, tx) => {
      this.eventEmitter.emit('token.transfer', {
        from,
        to,
        value,
        tx,
      });
    });
  }

  async balanceOf(address: string): Promise<bigint> {
    const balance = await this.contract.getFunction<
      BaseContractMethod<[string], bigint, bigint>
    >('balanceOf')(address);
    return balance;
  }

  async transfer(
    to: string,
    amount: bigint,
  ): Promise<{ txHash: string; nonce: number }> {
    const transfer =
      this.contract.getFunction<
        BaseContractMethod<[string, bigint], ContractTransactionResponse>
      >('transfer');
    const tx = await transfer(to, amount);
    return { txHash: tx.hash, nonce: tx.nonce };
  }
}
