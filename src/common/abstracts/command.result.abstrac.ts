import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export abstract class CommandResultAbstract<TData = unknown> {
  @ApiProperty({
    type: 'boolean',
    description: 'Command success',
    example: true,
  })
  @Expose()
  readonly success: boolean;

  @ApiProperty({
    type: 'string',
    description: 'Command message',
    example: 'Command successfully',
  })
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
