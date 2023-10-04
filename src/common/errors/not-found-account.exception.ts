import { NotFoundException } from '@nestjs/common';

export class NotFoundAccountException extends NotFoundException {
  constructor() {
    super('Account not found');
  }
}
