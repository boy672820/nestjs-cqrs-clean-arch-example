import { CommandResultAbstract } from '@common/abstracts';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface ICreateWalletResult {
  phrase: string;
  account: {
    id: string;
    address: string;
    privkey: string;
    balance: string;
  };
}

export class AccountDto {
  @ApiProperty({
    type: 'string',
    description: 'Account id',
    example: '01HBTTAG5C1PDRS1K1HXRHKW1N',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    type: 'string',
    format: 'address',
    description: 'Account address',
    example: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
  })
  @Expose()
  readonly address: string;

  @ApiProperty({
    type: 'string',
    format: 'hex',
    description: 'Account private key(hex)',
    example: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
  })
  @Expose()
  readonly privkey: string;

  @ApiProperty({
    type: 'string',
    format: 'uint256',
    description: 'Account balance',
    example: '100000000000000000000',
  })
  @Expose()
  readonly balance: string;
}

export class CreateWalletResultDto implements ICreateWalletResult {
  @ApiProperty({
    type: 'string',
    description: 'Wallet phrase',
    example:
      'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  })
  @Expose()
  readonly phrase: string;

  @ApiProperty({
    description: 'Account',
    type: AccountDto,
  })
  @Expose()
  readonly account: AccountDto;

  constructor(props: ICreateWalletResult) {
    Object.assign(this, props);
  }
}

export class CreateWalletCommandResult<
  T extends ICreateWalletResult = ICreateWalletResult,
> extends CommandResultAbstract<T> {
  @ApiProperty({
    type: CreateWalletResultDto,
    description: 'Wallet created',
  })
  readonly data: T;
}
