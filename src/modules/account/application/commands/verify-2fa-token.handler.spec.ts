import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  AccountIsLockedException,
  NotEnable2faException,
  NotFoundAccountException,
} from '@common/errors';
import { Verify2faTokenHandler } from './verify-2fa-token.handler';
import { InjectionToken } from '../../account.constants';
import { IAuthenticatorService } from '../adapters/authenticator.service.interface';
import { Verify2faTokenCommand } from './verify-2fa-token.command';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import type { IAccountRepository } from '../../domain/repositories/account.repository.interface';
import { MockProxy, mock } from 'jest-mock-extended';

describe('Verify2faTokenHandler', () => {
  let handler: Verify2faTokenHandler;
  let userRepository: MockProxy<IUserRepository>;
  let accountRepository: MockProxy<IAccountRepository>;
  let authenticatorService: MockProxy<IAuthenticatorService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        Verify2faTokenHandler,
        {
          provide: InjectionToken.USER_REPOSITORY,
          useValue: mock<IUserRepository>(),
        },
        {
          provide: InjectionToken.ACCOUNT_REPOSITORY,
          useValue: mock<IAccountRepository>(),
        },
        {
          provide: InjectionToken.AUTHENTICATOR,
          useValue: mock<IAuthenticatorService>(),
        },
      ],
    }).compile();

    handler = moduleRef.get<Verify2faTokenHandler>(Verify2faTokenHandler);
    userRepository = moduleRef.get<MockProxy<IUserRepository>>(
      InjectionToken.USER_REPOSITORY,
    );
    accountRepository = moduleRef.get<MockProxy<IAccountRepository>>(
      InjectionToken.ACCOUNT_REPOSITORY,
    );
    authenticatorService = moduleRef.get<MockProxy<IAuthenticatorService>>(
      InjectionToken.AUTHENTICATOR,
    );
  });

  describe('execute', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        handler.execute(
          new Verify2faTokenCommand('userId', 'accountId', 'token'),
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotEnable2faException if user otp secret is null ', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
        otpSecret: null,
      } as any);

      await expect(
        handler.execute(
          new Verify2faTokenCommand('userId', 'accountId', 'token'),
        ),
      ).rejects.toThrow(NotEnable2faException);
    });

    it('should throw NotFoundAccountException if account is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
        otpSecret: 'otpSecret',
      } as any);
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        handler.execute(
          new Verify2faTokenCommand('userId', 'accountId', 'token'),
        ),
      ).rejects.toThrow(NotFoundAccountException);
    });

    it('should throw AccountIsLockedException if account is locked', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
        otpSecret: 'otpSecret',
      } as any);
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce({
        isLocked: true,
      } as any);

      await expect(
        handler.execute(
          new Verify2faTokenCommand('userId', 'accountId', 'token'),
        ),
      ).rejects.toThrow(AccountIsLockedException);
    });

    it('should throw ForbiddenException if token is invalid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
        otpSecret: 'otpSecret',
      } as any);
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce({
        isLocked: false,
      } as any);
      jest.spyOn(authenticatorService, 'verify').mockReturnValueOnce(false);

      await expect(
        handler.execute(
          new Verify2faTokenCommand('userId', 'accountId', 'token'),
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return signed token', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({
        otpSecret: 'otpSecret',
      } as any);
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce({
        isLocked: false,
      } as any);
      jest.spyOn(authenticatorService, 'verify').mockReturnValueOnce(true);
      jest
        .spyOn(authenticatorService, 'sign')
        .mockReturnValueOnce('signedToken');

      const result = await handler.execute(
        new Verify2faTokenCommand('userId', 'accountId', 'token'),
      );

      expect(result.data).toEqual({ signedToken: 'signedToken' });
    });
  });
});
