import { History } from '../history';

export interface IHistoryRepository {
  /**
   * Create history
   *
   * @param history
   * @returns Promise<void>
   */
  create: (history: History) => Promise<void>;
}
