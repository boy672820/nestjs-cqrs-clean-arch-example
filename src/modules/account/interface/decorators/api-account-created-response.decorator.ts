import { ApiCreatedResponse } from '@nestjs/swagger';

export function ApiAccountCreatedResponse() {
  return ApiCreatedResponse({
    description: 'Account created',
    schema: {
      type: 'object',
      properties: {
        accountAddress: {},
      },
    },
  });
}
