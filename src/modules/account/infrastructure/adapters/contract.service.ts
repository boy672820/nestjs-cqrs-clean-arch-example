import { Injectable } from '@nestjs/common';
import { TokenContract } from '@libs/ethers';
import { parseEther } from 'ethers';
import type { IContractService } from '../../application/adapters/contract.service.interface';

@Injectable()
export class ContractService implements IContractService {
  constructor(private readonly tokenContract: TokenContract) {}

  async getBalance(eoa: string): Promise<bigint> {
    const balance = await this.tokenContract.balanceOf(eoa);
    return balance;
  }

  async transfer(eoa: string, amount: string) {
    const tx = await this.tokenContract.transfer(eoa, parseEther(amount));
    return tx;
  }
}
