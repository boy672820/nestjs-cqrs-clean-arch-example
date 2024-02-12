import { AlchemyProvider, HDNodeWallet, Mnemonic, Provider } from 'ethers';
import { InjectionTokens } from './ethers.constants';
import type {
  AlchemyProviderOptions,
  SignerProviderOptions,
} from './ethers.interface';

export const createAlchemyProvider = (options: AlchemyProviderOptions) => ({
  provide: InjectionTokens.ALCHEMY,
  useFactory: async () => {
    const alchemy = new AlchemyProvider(options.network, options.alchemy);
    await alchemy.ready;
    return alchemy;
  },
});

export const createSignerProvider = (options: SignerProviderOptions) => ({
  provide: InjectionTokens.SIGNER,
  useFactory: async (provider: Provider) => {
    const mnemonic = Mnemonic.fromPhrase(options.phrase, options.password);
    const hdnode = HDNodeWallet.fromMnemonic(mnemonic).connect(provider);
    const signer = hdnode.deriveChild(0);
    return signer;
  },
  inject: [InjectionTokens.ALCHEMY],
});
