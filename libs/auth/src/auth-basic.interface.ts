import type { UserPayload } from './auth.types';

export interface IAuthBasicService {
  /**
   * Validate user
   *
   * @param username
   * @param password
   */
  validateUser(username: string, password: string): Promise<UserPayload | null>;
}
