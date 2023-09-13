import { Injectable } from '@nestjs/common';
import { HDNodeWallet } from 'ethers';
import type { IWalletService } from '../../application/adapters/wallet.service.interface';

@Injectable()
export class WalletService implements IWalletService {
  createWallet(password: string) {
    const hdnode = HDNodeWallet.createRandom(password);
    console.log(hdnode);
    return {
      phrase: hdnode.mnemonic.phrase,
      address: hdnode.deriveChild(0).address,
    };
  }
}
