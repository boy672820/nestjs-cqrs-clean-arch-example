type TransferResponse = {
  hash: string;
  nonce: number;
  index: number;
  gasLimit: bigint;
};

export abstract class TokenContract {
  abstract balanceOf(address: string): Promise<bigint>;
  abstract transfer(to: string, amount: bigint): Promise<TransferResponse>;
}
