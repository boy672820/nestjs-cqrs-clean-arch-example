export class TokenTransferredEvent {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly value: bigint,
    public readonly txHash: string,
    public readonly nonce: number,
  ) {}
}
