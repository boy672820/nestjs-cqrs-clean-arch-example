import { ConflictException } from '@nestjs/common';

export class NotEnable2faException extends ConflictException {
  constructor() {
    super('2FA is not enabled');
  }
}
