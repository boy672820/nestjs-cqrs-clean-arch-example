import { EntityRepository } from '@mikro-orm/postgresql';
import { Account } from '../entities';

export class AccountRepository extends EntityRepository<Account> {}
