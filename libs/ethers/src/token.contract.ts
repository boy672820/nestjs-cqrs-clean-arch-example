import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  BaseContract,
  BaseContractMethod,
  ContractEventPayload,
  ContractTransactionResponse,
} from 'ethers';
import { InjectionTokens } from './ethers.constants';
import { TokenContract } from './token.contract.abstract';
import { TokenTransferredEvent } from './events';

export class TokenContractImpl
  implements TokenContract, OnApplicationBootstrap
{
  constructor(
    @Inject(InjectionTokens.BASE_CONTRACT)
    private readonly contract: BaseContract,
    private eventEmitter: EventEmitter2,
  ) {}

  onApplicationBootstrap() {
    // 트랜잭션 대기 중인 이벤트를 구독합니다.
    this.contract.on(
      'Transfer',
      async (from, to, value, payload: ContractEventPayload) => {
        const tx = await payload.getTransaction();
        this.eventEmitter.emit(
          'token.transferred',
          new TokenTransferredEvent(from, to, value, tx.hash, tx.nonce),
        );
        const receipt = await tx.wait();
      },
    );
  }

  async balanceOf(address: string): Promise<bigint> {
    const balance = await this.contract.getFunction<
      BaseContractMethod<[string], bigint, bigint>
    >('balanceOf')(address);
    return balance;
  }

  async transfer(to: string, amount: bigint) {
    const transfer =
      this.contract.getFunction<
        BaseContractMethod<[string, bigint], ContractTransactionResponse>
      >('transfer');
    const tx = await transfer(to, amount);

    return {
      hash: tx.hash,
      nonce: tx.nonce,
      index: tx.index,
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
    };
  }
}
