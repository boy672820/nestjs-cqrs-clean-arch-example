import { CommandResultAbstract } from '@common/abstracts';

interface CreateWalletResult {
  phrase: string;
  accountAddress: string;
  privkey: string;
  balance: string;
}

export class CreateWalletCommandResult<
  T extends CreateWalletResult = CreateWalletResult,
> extends CommandResultAbstract<T> {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data: T,
  ) {
    super(success, message, data);
  }
}
