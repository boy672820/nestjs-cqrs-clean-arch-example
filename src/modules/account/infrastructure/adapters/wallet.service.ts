import { Injectable, OnModuleInit } from '@nestjs/common';
import { DerivedAccount } from '../../domain/account';
import { WalletConfigService } from '../../../../config';
import { HDNodeWallet } from 'ethers';
import type { IWalletService } from '../../application/adapters/wallet.service.interface';

@Injectable()
export class WalletService implements IWalletService, OnModuleInit {
  private hdNode: HDNodeWallet;

  constructor(private readonly walletConfig: WalletConfigService) {}

  onModuleInit() {
    this.hdNode = HDNodeWallet.fromPhrase(
      this.walletConfig.phrase,
      this.walletConfig.password,
    );
  }

  createAccount(index: number | bigint): DerivedAccount {
    const childAddress = this.hdNode.deriveChild(index);
    return {
      address: childAddress.address,
      privkey: childAddress.privateKey,
    };
  }
}
