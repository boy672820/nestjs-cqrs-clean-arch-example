type TransferResponse = {
  hash: string;
  nonce: number;
  index: number;
  gasPrice: bigint;
  gasLimit: bigint;
};

export abstract class TokenContract {
  abstract balanceOf(address: string): Promise<bigint>;
  abstract transfer(to: string, amount: bigint): Promise<TransferResponse>;
}
