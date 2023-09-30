import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsValidMnemonic } from '@common/validators';
import { CreateWalletDto } from './create-wallet.dto';

export class AddAccountUnsafeDto extends PickType(CreateWalletDto, [
  'password',
] as const) {
  @ApiProperty({
    description: 'Phrase of wallet',
    example:
      'the mnemonic code phrase consists of twelve to twenty four words ...',
  })
  @IsValidMnemonic()
  readonly phrase: string;
}
