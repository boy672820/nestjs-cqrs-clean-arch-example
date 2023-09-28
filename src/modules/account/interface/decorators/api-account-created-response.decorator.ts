import { ApiCreatedResponse } from '@nestjs/swagger';

export function ApiAccountCreatedResponse() {
  return ApiCreatedResponse({
    description: 'Account created',
    schema: {
      type: 'object',
      properties: {
        phrase: {
          type: 'string',
          description: 'Wallet phrase',
          example:
            'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
        },
        accountAddress: {
          type: 'string',
          format: 'address',
          description: 'Account address',
          example: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
        },
        privkey: {
          type: 'string',
          format: 'hex',
          description: 'Account private key(hex)',
          example: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
        },
        balance: {
          type: 'string',
          format: 'uint256',
          description: 'Account balance',
          example: '100000000000000000000',
        },
      },
    },
  });
}
