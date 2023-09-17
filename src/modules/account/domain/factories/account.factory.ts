import { Injectable } from '@nestjs/common';
import { Account, AccountProperties } from '../account';

@Injectable()
export class AccountFactory {
  create(props: AccountProperties): Account {
    return new Account(props);
  }
}
