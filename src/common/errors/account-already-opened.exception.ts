import { BadRequestException } from '@nestjs/common';

export class AccountAlreadyOpenedException extends BadRequestException {
  constructor() {
    super('Account already opened');
  }
}
