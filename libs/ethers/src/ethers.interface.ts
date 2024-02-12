export type Network = 'mainnet' | 'sepolia';

export interface AlchemyProviderOptions {
  network: Network;
  alchemy: string;
}

export interface SignerProviderOptions {
  phrase: string;
  password?: string;
}

export interface EthersModuleRootOptions
  extends AlchemyProviderOptions,
    SignerProviderOptions {
  network: Network;
}
