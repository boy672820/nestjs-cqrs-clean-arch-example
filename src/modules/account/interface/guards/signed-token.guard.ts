import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignedTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token);

      if (this.invalidPayload(payload)) {
        return false;
      }

      request.user = { userId: payload.sub, accountId: payload.accountId };
    } catch (error) {
      return false;
    }

    return true;
  }

  /**
   * Extracts the token from the request.
   *
   * @param request The request to extract the token from.
   * @returns The token or null if not found.
   */
  private extractToken(request: any): string | null {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return null;
    }

    return token;
  }

  /**
   * Type guard for UserPayload.
   *
   * @param payload The payload to check.
   * @returns True if payload is valid.
   */
  private invalidPayload = (payload: unknown): boolean =>
    !(
      typeof payload === 'object' &&
      payload !== null &&
      'sub' in payload &&
      typeof payload.sub === 'string' &&
      'accountId' in payload &&
      typeof payload.accountId === 'string'
    );
}
