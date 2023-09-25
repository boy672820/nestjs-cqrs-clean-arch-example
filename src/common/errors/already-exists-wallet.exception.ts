import { ConflictException } from '@nestjs/common';

export class AlreadyExistsWalletException extends ConflictException {
  constructor() {
    super('Already exists wallet');
  }
}
