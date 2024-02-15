export interface IContractService {
  getAddress(): string;
  transfer(eoa: string, amount: string): Promise<void>;
}
