import { ConflictException } from '@nestjs/common';

export class InsufficientFundsException extends ConflictException {
  constructor() {
    super('Insufficient funds');
  }
}
