import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CommandResultAbstract } from '@common/abstracts';
import { AccountDto, ICreateWalletResult } from './create-wallet.result';
import { Expose } from 'class-transformer';

export interface ILockAccountResult {
  account: Omit<ICreateWalletResult['account'], 'privkey'>;
  lockedAt: Date;
}

export class LockedAccountDto extends OmitType(AccountDto, [
  'privkey',
] as const) {
  @ApiProperty({
    description: 'Account is locked',
    example: true,
  })
  @Expose()
  readonly isLocked: boolean = true;
}

export class LockAccountResultDto implements ILockAccountResult {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'Locked at',
    example: '2021-08-20T07:08:44.000Z',
  })
  @Expose()
  readonly lockedAt: Date;

  @ApiProperty({
    description: 'Locked account',
    type: LockedAccountDto,
  })
  @Expose()
  readonly account: LockedAccountDto;

  constructor(props: ILockAccountResult) {
    Object.assign(this, props);
  }
}

export class LockAccountCommandResult<
  T extends ILockAccountResult = ILockAccountResult,
> extends CommandResultAbstract<T> {
  @ApiProperty({
    type: LockAccountResultDto,
    description: 'Account locked',
  })
  readonly data: T;
}
