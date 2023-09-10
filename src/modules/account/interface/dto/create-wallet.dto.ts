import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'Password of wallet', example: 'yourpassword' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
