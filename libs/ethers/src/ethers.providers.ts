import { AlchemyProvider, HDNodeWallet, Mnemonic } from 'ethers';
import { InjectionTokens } from './ethers.constants';
import type {
  AlchemyProviderOptions,
  SignerProviderOptions,
} from './ethers.interface';

export const createAlchemyProviderFactory = async (
  options: AlchemyProviderOptions,
) => {
  const alchemy = new AlchemyProvider(options.network, options.alchemy);
  await alchemy.ready;
  return alchemy;
};

export const createSignerFactory =
  (options: SignerProviderOptions) => async (provider: AlchemyProvider) => {
    const mnemonic = Mnemonic.fromPhrase(options.phrase, options.password);
    const hdnode = HDNodeWallet.fromMnemonic(mnemonic).connect(provider);
    const signer = hdnode.deriveChild(0);
    return signer;
  };

export const createAlchemyProvider = (options: AlchemyProviderOptions) => ({
  provide: InjectionTokens.ALCHEMY_PROVIDER,
  useFactory: async () => {
    return await createAlchemyProviderFactory(options);
  },
});

export const createSignerProvider = (options: SignerProviderOptions) => ({
  provide: InjectionTokens.SIGNER,
  useFactory: async (alchemyProvider: AlchemyProvider) => {
    return await createSignerFactory(options)(alchemyProvider);
  },
  inject: [InjectionTokens.ALCHEMY_PROVIDER],
});

export const createAlchemyProviderAsync = () => ({
  provide: InjectionTokens.ALCHEMY_PROVIDER,
  useFactory: createAlchemyProviderFactory,
  inject: [InjectionTokens.ASYNC_OPTIONS],
});

export const createSignerAsync = () => ({
  provide: InjectionTokens.SIGNER,
  useFactory: async (
    options: SignerProviderOptions,
    alchemyProvider: AlchemyProvider,
  ) => {
    return await createSignerFactory(options)(alchemyProvider);
  },
  inject: [InjectionTokens.ASYNC_OPTIONS, InjectionTokens.ALCHEMY_PROVIDER],
});
