import { Inject, Injectable } from '@nestjs/common';
import { InjectionTokens } from './ethers.constants';
import { type BigNumberish, Wallet } from 'ethers';

@Injectable()
export class EthersService {
  constructor(
    @Inject(InjectionTokens.SIGNER) private readonly signer: Wallet,
  ) {}

  getAddress() {
    return this.signer.address;
  }

  async transfer(eoa: string, amount: BigNumberish): Promise<void> {
    await this.signer.sendTransaction({
      to: eoa,
      value: amount,
    });
  }
}
