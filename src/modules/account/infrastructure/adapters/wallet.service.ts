import { Injectable } from '@nestjs/common';
import { HDNodeWallet } from 'ethers';
import type { IWalletService } from '../../application/adapters/wallet.service.interface';
import type { CreatedHDNode } from '../../domain/wallet';
import type { DerivedChild } from '../../domain/account';

@Injectable()
export class WalletService implements IWalletService {
  createHDNode(password: string): CreatedHDNode {
    const hdnode = HDNodeWallet.createRandom(password);
    return {
      phrase: hdnode.mnemonic.phrase,
      address: hdnode.address,
      publicKey: hdnode.publicKey,
    };
  }

  derive(phrase: string, index: number): DerivedChild {
    const hdnode = HDNodeWallet.fromPhrase(phrase);
    const child = hdnode.derivePath("m/44'/60'/0'/0/" + index);
    return {
      address: child.address,
      privkey: child.privateKey,
    };
  }
}
