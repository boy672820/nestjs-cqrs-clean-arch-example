export interface IContractService {
  getBalance(eoa: string): Promise<bigint>;
  transfer(eoa: string, amount: bigint): Promise<any>;
}
