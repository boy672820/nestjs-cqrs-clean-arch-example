import {
  Inject,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import {
  AccountIsLockedException,
  NotEnable2faException,
  NotFoundAccountException,
} from '@common/errors';
import { Verify2faTokenCommand } from './verify-2fa-token.command';
import { InjectionToken } from '../../account.constants';
import { Verify2faTokenCommandResult } from './verify-2fa-token.result';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import type { IAuthenticatorService } from '../adapters/authenticator.service.interface';

@CommandHandler(Verify2faTokenCommand)
export class Verify2faTokenHandler extends CommandHandlerAbstract<
  Verify2faTokenCommand,
  Verify2faTokenCommandResult
> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    @Inject(InjectionToken.AUTHENTICATOR)
    private readonly authenticatorService: IAuthenticatorService,
  ) {
    super();
  }

  async execute(command: Verify2faTokenCommand) {
    const { userId, accountId, token } = command;

    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    // 2fa is not enabled
    if (user.otpSecret === null) {
      throw new NotEnable2faException();
    }

    const account = await this.accountRepository.findOne(accountId, user.id);

    // account not found
    if (!account) {
      throw new NotFoundAccountException();
    }

    // account is locked
    if (account.isLocked) {
      throw new AccountIsLockedException();
    }

    const isValid = this.authenticatorService.verify(user.otpSecret, token);

    // invalid otp token
    if (!isValid) {
      throw new ForbiddenException();
    }

    const signedToken = this.authenticatorService.sign(user.id, account.id);

    return new Verify2faTokenCommandResult(true, 'Signed token', {
      signedToken,
    });
  }
}
