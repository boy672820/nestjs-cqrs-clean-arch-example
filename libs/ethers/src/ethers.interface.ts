export type Network = 'mainnet' | 'sepolia';

export interface AlchemyProviderOptions {
  network: Network;
  alchemy: string;
}

export interface SignerProviderOptions {
  phrase: string;
  password?: string;
}

export interface ContractProviderOptions {
  address: string;
  abi: Array<Record<string, string | boolean>>;
}

export interface EthersModuleRootOptions
  extends AlchemyProviderOptions,
    SignerProviderOptions,
    ContractProviderOptions {
  network: Network;
}

export interface EthersModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<EthersModuleRootOptions> | EthersModuleRootOptions;
  inject?: any[];
  imports?: any[];
}
