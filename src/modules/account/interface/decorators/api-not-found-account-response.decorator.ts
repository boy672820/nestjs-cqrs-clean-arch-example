import { ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiNotFoundAccountResponse() {
  return ApiNotFoundResponse({ description: 'Account not found' });
}
