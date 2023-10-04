import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CommandResultAbstract } from '@common/abstracts';
import {
  ICreateWalletResult,
  CreateWalletResultDto,
} from './create-wallet.result';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAddAccountUnsafeResult extends Omit<ICreateWalletResult, 'phrase'> {}

export class AddAccountUnsafeResultDto
  extends OmitType(CreateWalletResultDto, ['phrase'] as const)
  implements IAddAccountUnsafeResult
{
  constructor(props: IAddAccountUnsafeResult) {
    super(props);
  }
}

export class AddAccountUnsafeCommandResult<
  T extends IAddAccountUnsafeResult = IAddAccountUnsafeResult,
> extends CommandResultAbstract<T> {
  @ApiProperty({
    type: AddAccountUnsafeResultDto,
    description: 'Account added',
  })
  readonly data: T;
}
