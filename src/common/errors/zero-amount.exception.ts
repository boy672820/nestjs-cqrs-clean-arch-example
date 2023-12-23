import { BadRequestException } from '@nestjs/common';

export class ZeroAmountException extends BadRequestException {
  constructor() {
    super('Cannot transfer zero amount');
  }
}
