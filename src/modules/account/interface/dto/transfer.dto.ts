import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class TransferDto {
  @ApiProperty({
    description: 'wei amount',
    example: '1000000000000000000',
  })
  @IsNumberString({ no_symbols: true })
  readonly amount: string;
}
