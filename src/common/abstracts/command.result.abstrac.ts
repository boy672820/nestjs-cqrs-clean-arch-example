import { Exclude, Expose } from 'class-transformer';

export abstract class CommandResultAbstract<TData = unknown> {
  @Expose()
  readonly success: boolean;

  @Expose()
  readonly message: string;

  @Expose()
  readonly data: TData;

  constructor(success: boolean, message: string, data: TData) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  @Exclude()
  plain = () => ({
    success: this.success,
    message: this.message,
    data: this.data,
  });
}
