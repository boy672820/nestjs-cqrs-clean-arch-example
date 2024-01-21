import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumberString } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({
    description: 'wei amount',
    example: '1000000000000000000',
  })
  @IsNumberString({ no_symbols: true })
  readonly amount: string;

  @ApiProperty({
    description: 'destination address',
    example: '0x1234567890123456789012345678901234567890',
  })
  @IsEthereumAddress()
  readonly destAddress: string;
}
