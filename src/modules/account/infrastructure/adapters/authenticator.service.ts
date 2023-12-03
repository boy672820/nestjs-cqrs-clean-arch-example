import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@config';
import { authenticator } from 'otplib';
import type { IAuthenticatorService } from '../../application/adapters/authenticator.service.interface';

@Injectable()
export class AuthenticatorService implements IAuthenticatorService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  verify(secret: string, token: string): boolean {
    const isValid = authenticator.check(token, secret);

    return isValid;
  }

  sign(userId: string, accountId: string): string {
    const token = this.jwtService.sign({
      sub: userId,
      iss: this.appConfigService.serviceName,
      accountId,
    });

    return token;
  }

  verifyJwt(token: string): { userId: string; accountId: string } {
    const { sub: userId, accountId } = this.jwtService.verify(token);

    return { userId, accountId };
  }
}
