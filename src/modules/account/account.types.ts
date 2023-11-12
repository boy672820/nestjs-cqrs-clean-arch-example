import type { UserPayload } from '@libs/auth';

export type Account = { id: string };

export interface UserPayloadExtended extends UserPayload {
  account: Account;
}
