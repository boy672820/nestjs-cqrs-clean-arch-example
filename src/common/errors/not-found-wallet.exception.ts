import { NotFoundException } from '@nestjs/common';

export class NotFoundWalletException extends NotFoundException {
  constructor() {
    super('Wallet not found');
  }
}
