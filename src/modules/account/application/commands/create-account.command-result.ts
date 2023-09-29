import { OmitType } from '@nestjs/swagger';
import { CommandResultAbstract } from '@common/abstracts';
import {
  CreateWalletResult,
  CreateWalletResultDto,
} from './create-wallet.command-result';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateAccountResult extends Omit<CreateWalletResult, 'phrase'> {}

export class CreateAccountResultDto
  extends OmitType(CreateWalletResultDto, ['phrase'] as const)
  implements CreateAccountResult
{
  constructor(props: CreateAccountResult) {
    super(props);
  }
}

export class CreateAccountCommandResult<
  T extends CreateAccountResult = CreateAccountResult,
> extends CommandResultAbstract<T> {}
