export abstract class CommandResultAbstract<TData = unknown> {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data: TData,
  ) {}

  plain = () => ({
    success: this.success,
    message: this.message,
    data: this.data,
  });
}
