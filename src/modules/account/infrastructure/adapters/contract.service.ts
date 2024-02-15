import { Injectable } from '@nestjs/common';
import { EthersService } from '@libs/ethers';
import type { IContractService } from '../../application/adapters/contract.service.interface';

@Injectable()
export class ContractService implements IContractService {
  constructor(private readonly ethersService: EthersService) {}

  getAddress(): string {
    return this.ethersService.getAddress();
  }

  async transfer(eoa: string, amount: string): Promise<void> {
    await Promise.resolve();
  }
}
