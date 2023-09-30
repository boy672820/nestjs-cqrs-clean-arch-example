import { CommandResultAbstract } from '@common/abstracts';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface CreateWalletResult {
  phrase: string;
  accountAddress: string;
  privkey: string;
  balance: string;
}

export class CreateWalletResultDto implements CreateWalletResult {
  @ApiProperty({
    type: 'string',
    description: 'Wallet phrase',
    example:
      'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  })
  @Expose()
  readonly phrase: string;

  @ApiProperty({
    type: 'string',
    format: 'address',
    description: 'Account address',
    example: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
  })
  @Expose()
  readonly accountAddress: string;

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

  constructor(props: CreateWalletResult) {
    Object.assign(this, props);
  }
}

export class CreateWalletCommandResult<
  T extends CreateWalletResult = CreateWalletResult,
> extends CommandResultAbstract<T> {
  @ApiProperty({
    type: CreateWalletResultDto,
    description: 'Wallet created',
  })
  readonly data: T;
}
