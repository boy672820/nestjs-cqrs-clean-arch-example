import { Type } from '@mikro-orm/core';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

type ApiCommandResponseOptions = {
  description: string;
  status: HttpStatus;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: Type<unknown> | Function | [Function] | SchemaObject | ReferenceObject;
};

export function ApiCommandResponse({
  description,
  status,
  data,
}: ApiCommandResponseOptions) {
  return ApiResponse({
    description,
    status,
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: 'Command success',
          example: true,
        },
        message: {
          type: 'string',
          description: 'Command message',
          example: 'Wallet created',
        },
      },
    },
  });
}
