import { UnprocessableEntityException } from '@nestjs/common';

export class CannotTransferToSameAccountException extends UnprocessableEntityException {
  constructor() {
    super('Cannot transfer to the same account');
  }
}
