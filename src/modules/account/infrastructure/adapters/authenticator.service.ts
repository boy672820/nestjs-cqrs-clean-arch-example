import { Injectable } from '@nestjs/common';
import { OTP_SERVICE_NAME } from '../../account.constants';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import type { IAuthenticatorService } from '../../application/adapters/authenticator.service.interface';

@Injectable()
export class AuthenticatorService implements IAuthenticatorService {
  generate(userId: string) {
    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);
    const otpAuthUrl = authenticator.keyuri(userId, OTP_SERVICE_NAME, secret);

    return { secret, token, otpAuthUrl };
  }

  toDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }
}
