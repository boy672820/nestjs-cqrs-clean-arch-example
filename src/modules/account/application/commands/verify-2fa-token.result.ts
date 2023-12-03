import { ApiProperty } from '@nestjs/swagger';
import { CommandResultAbstract } from '@common/abstracts';
import { Expose } from 'class-transformer';

export interface IVerify2faTokenResult {
  signedToken: string;
}

export class Verify2faTokenResultDto implements IVerify2faTokenResult {
  @ApiProperty({
    description: 'Signed token',
    type: 'string',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @Expose()
  readonly signedToken: string;

  constructor(props: IVerify2faTokenResult) {
    Object.assign(this, props);
  }
}

export class Verify2faTokenCommandResult<
  T extends IVerify2faTokenResult = IVerify2faTokenResult,
> extends CommandResultAbstract<T> {
  @ApiProperty({
    type: Verify2faTokenResultDto,
    description: 'Signed token',
  })
  readonly data: T;
}
