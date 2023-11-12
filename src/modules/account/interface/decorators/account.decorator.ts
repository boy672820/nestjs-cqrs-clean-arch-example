import { UseGuards, applyDecorators } from '@nestjs/common';
import { AccountGuard } from '../guards';

export function Account() {
  return applyDecorators(UseGuards(AccountGuard));
}
