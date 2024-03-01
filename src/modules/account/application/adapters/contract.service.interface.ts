export interface IContractService {
  getBalance(eoa: string): Promise<bigint>;
  transfer(eoa: string, amount: string): Promise<void>;
}
