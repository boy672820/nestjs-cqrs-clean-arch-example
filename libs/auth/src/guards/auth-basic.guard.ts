import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PublicGuard } from './public.guard';
import type { IAuthBasicService } from '../auth-basic.interface';

@Injectable()
export class AuthBasicGuard extends PublicGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    @Inject('AUTH_BASIC_SERVICE')
    private readonly authBasicService: IAuthBasicService,
  ) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await super.canActivate(context)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;

    if (!authorization) {
      return false;
    }

    const [username, password] = Buffer.from(
      authorization.replace('Basic ', ''),
      'base64',
    )
      .toString()
      .split(':');

    if (!username || !password) {
      throw new ForbiddenException();
    }

    const user = await this.authBasicService.validateUser(username, password);

    if (!user) {
      throw new ForbiddenException();
    }

    request.user = user;
    return true;
  }
}
