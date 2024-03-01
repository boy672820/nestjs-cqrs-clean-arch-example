import { AlchemyProvider, BaseContract, HDNodeWallet, Mnemonic } from 'ethers';
import { InjectionTokens } from './ethers.constants';
import type {
  AlchemyProviderOptions,
  ContractProviderOptions,
  SignerProviderOptions,
} from './ethers.interface';

export const createAlchemyProviderFactory = async (
  options: AlchemyProviderOptions,
): Promise<AlchemyProvider> => {
  const alchemy = new AlchemyProvider(options.network, options.alchemy);
  await alchemy.ready;
  return alchemy;
};

export const createSignerFactory =
  (options: SignerProviderOptions) =>
  (provider: AlchemyProvider): HDNodeWallet => {
    const mnemonic = Mnemonic.fromPhrase(options.phrase, options.password);
    const hdnode = HDNodeWallet.fromMnemonic(mnemonic).connect(provider);
    const signer = hdnode.deriveChild(0);
    return signer;
  };

export const createContractFactory =
  (options: ContractProviderOptions) =>
  (signer: HDNodeWallet): BaseContract => {
    const contract = new BaseContract(options.address, options.abi, signer);
    return contract;
  };

export const createAlchemyProvider = (options: AlchemyProviderOptions) => ({
  provide: InjectionTokens.ALCHEMY_PROVIDER,
  useFactory: async () => createAlchemyProviderFactory(options),
});

export const createSignerProvider = (options: SignerProviderOptions) => ({
  provide: InjectionTokens.SIGNER,
  useFactory: async (alchemyProvider: AlchemyProvider) =>
    createSignerFactory(options)(alchemyProvider),
  inject: [InjectionTokens.ALCHEMY_PROVIDER],
});

export const createContractProvider = (options: ContractProviderOptions) => ({
  provide: InjectionTokens.BASE_CONTRACT,
  useFactory: (signer: HDNodeWallet) => createContractFactory(options)(signer),
  inject: [InjectionTokens.SIGNER],
});

export const createAlchemyProviderAsync = () => ({
  provide: InjectionTokens.ALCHEMY_PROVIDER,
  useFactory: createAlchemyProviderFactory,
  inject: [InjectionTokens.ASYNC_OPTIONS],
});

export const createSignerAsync = () => ({
  provide: InjectionTokens.SIGNER,
  useFactory: (
    options: SignerProviderOptions,
    alchemyProvider: AlchemyProvider,
  ) => createSignerFactory(options)(alchemyProvider),
  inject: [InjectionTokens.ASYNC_OPTIONS, InjectionTokens.ALCHEMY_PROVIDER],
});

export const createContractAsync = () => ({
  provide: InjectionTokens.BASE_CONTRACT,
  useFactory: (options: ContractProviderOptions, signer: HDNodeWallet) =>
    createContractFactory(options)(signer),
  inject: [InjectionTokens.ASYNC_OPTIONS, InjectionTokens.SIGNER],
});
