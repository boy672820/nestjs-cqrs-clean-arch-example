import { User } from '../user';

export interface IUserRepository {
  /**
   * Find one user by id
   *
   * @param id - User id
   * @returns Promise with user or null
   */
  findOne: (id: string) => Promise<User | null>;
}
