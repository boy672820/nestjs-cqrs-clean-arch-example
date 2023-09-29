import { ApiCommandResponse } from '@common/swagger/decorators';
import { HttpStatus } from '@nestjs/common';

export function ApiAccountCreatedResponse() {
  return ApiCommandResponse({
    description: 'Account successfully created',
    status: HttpStatus.CREATED,
  });
}
