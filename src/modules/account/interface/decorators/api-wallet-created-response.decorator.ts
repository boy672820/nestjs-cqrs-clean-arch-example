import { ApiCommandResponse } from '@common/swagger/decorators';
import { HttpStatus } from '@nestjs/common';
import { CreateWalletResultDto } from '../../application/commands/create-wallet.command-result';

export function ApiWalletCreatedResponse() {
  return ApiCommandResponse({
    description: 'Wallet successfully created',
    status: HttpStatus.CREATED,
    data: CreateWalletResultDto,
  });
}
