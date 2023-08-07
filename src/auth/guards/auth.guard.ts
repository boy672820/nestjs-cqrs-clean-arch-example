import { CanActivate, ExecutionContext } from '@nestjs/common';
import { accounts } from '../../db/accounts';

/**
 * Basic AuthGuard
 */
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      return false;
    }

    const [type, token] = authorization.split(' ');
    if ((type !== 'Basic' && type !== 'basic') || !token) {
      return false;
    }

    const [username, password] = Buffer.from(token, 'base64')
      .toString('utf-8')
      .split(':');

    if (!username || !password) {
      return false;
    }

    const user = accounts.find((account) => account.id === username);

    if (!user || user.password !== password) {
      return false;
    }

    request.user = user;

    return true;
  }
}
