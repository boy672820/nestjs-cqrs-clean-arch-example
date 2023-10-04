import { BadRequestException } from '@nestjs/common';

export class AccountAlreadyLockedException extends BadRequestException {
  constructor() {
    super('Account already locked');
  }
}
