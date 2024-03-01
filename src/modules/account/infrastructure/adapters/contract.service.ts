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

  async transfer(eoa: string, amount: string): Promise<void> {
    await Promise.resolve();
  }
}
