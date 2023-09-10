import type { UserPayload } from './auth.types';

export interface IAuthBasicService {
  validateUser(username: string, password: string): Promise<UserPayload | null>;
}
