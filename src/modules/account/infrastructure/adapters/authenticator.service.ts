import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import type { IAuthenticatorService } from '../../application/adapters/authenticator.service.interface';

@Injectable()
export class AuthenticatorService implements IAuthenticatorService {
  verify(secret: string, token: string): boolean {
    const isValid = authenticator.check(token, secret);

    return isValid;
  }
}
