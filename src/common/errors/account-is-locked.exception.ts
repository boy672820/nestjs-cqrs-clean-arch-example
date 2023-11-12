import { UnprocessableEntityException } from '@nestjs/common';

export class AccountIsLockedException extends UnprocessableEntityException {
  constructor() {
    super('Account is locked');
  }
}
