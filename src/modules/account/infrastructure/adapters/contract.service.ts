import { Injectable } from '@nestjs/common';
import { TokenContract } from '@libs/ethers';
import type { IContractService } from '../../application/adapters/contract.service.interface';

@Injectable()
export class ContractService implements IContractService {
  constructor(private readonly tokenContract: TokenContract) {}

  async getBalance(eoa: string): Promise<bigint> {
    const balance = await this.tokenContract.balanceOf(eoa);
    return balance;
  }

  async transfer(eoa: string, amount: bigint): Promise<any> {
    const tx = await this.tokenContract.transfer(eoa, BigInt(amount));
    return tx;
  }
}
