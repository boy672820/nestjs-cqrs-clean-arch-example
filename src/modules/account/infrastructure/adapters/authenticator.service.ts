import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import type { IAuthenticatorService } from '../../application/adapters/authenticator.service.interface';

@Injectable()
export class AuthenticatorService implements IAuthenticatorService {
  generate(userId: string): string {
    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);
    console.log('secret', secret);

    return token;
  }
}
