import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CommandResultAbstract } from '@common/abstracts';
import {
  CreateWalletResult,
  CreateWalletResultDto,
} from './create-wallet.result';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddAccountUnsafeResult extends Omit<CreateWalletResult, 'phrase'> {}

export class AddAccountUnsafeResultDto
  extends OmitType(CreateWalletResultDto, ['phrase'] as const)
  implements AddAccountUnsafeResult
{
  constructor(props: AddAccountUnsafeResult) {
    super(props);
  }
}

export class AddAccountUnsafeCommandResult<
  T extends AddAccountUnsafeResult = AddAccountUnsafeResult,
> extends CommandResultAbstract<T> {
  @ApiProperty({
    type: AddAccountUnsafeResultDto,
    description: 'Account added',
  })
  readonly data: T;
}
