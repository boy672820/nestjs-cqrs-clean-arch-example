import { Injectable } from '@nestjs/common';
import { HDNodeWallet } from 'ethers';
import type { IWalletService } from '../../application/adapters/wallet.service.interface';
import type { CreatedHDNode } from '../../domain/wallet';

@Injectable()
export class WalletService implements IWalletService {
  createHDNode(password: string): CreatedHDNode {
    const hdnode = HDNodeWallet.createRandom(password);
    const child = hdnode.deriveChild(0);

    return {
      phrase: hdnode.mnemonic.phrase,
      address: hdnode.address,
      publicKey: hdnode.publicKey,
      child: {
        address: child.address,
        index: child.index,
        privkey: child.privateKey,
      },
    };
  }
}
