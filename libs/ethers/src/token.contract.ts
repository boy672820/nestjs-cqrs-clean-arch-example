import { Inject } from '@nestjs/common';
import { BaseContract, BaseContractMethod } from 'ethers';
import { InjectionTokens } from './ethers.constants';

export abstract class TokenContract {
  abstract balanceOf(address: string): Promise<bigint>;
}

export class TokenContractImpl implements TokenContract {
  constructor(
    @Inject(InjectionTokens.BASE_CONTRACT)
    private readonly contract: BaseContract,
  ) {}

  async balanceOf(address: string): Promise<bigint> {
    const balance = await this.contract.getFunction<
      BaseContractMethod<[string], bigint, bigint>
    >('balanceOf')(address);
    return balance;
  }

  // async transfer(to: string, amount: string): Promise<void> {}
}
