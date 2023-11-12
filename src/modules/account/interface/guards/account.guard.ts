import { EntityManager } from '@mikro-orm/postgresql';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccountIsLockedException } from '@common/errors';
import { Account as AccountEntity } from '@common/database/entities';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private readonly em: EntityManager) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.id) {
      throw new Error('User not found');
    }

    const accountId = request.headers['x-account-id'];

    if (!accountId) {
      return false;
    }

    const account = await this.em.findOne(AccountEntity, [accountId, user.id], {
      fields: ['isLocked'],
    });

    if (!account) {
      return false;
    }

    if (account.isLocked) {
      throw new AccountIsLockedException();
    }

    // Extend user object with account id
    request.user = { ...user, account: { id: accountId } };

    return true;
  }
}
