export abstract class TokenContract {
  abstract balanceOf(address: string): Promise<bigint>;
  abstract transfer(
    to: string,
    amount: bigint,
  ): Promise<{
    txHash: string;
    nonce: number;
  }>;
}
