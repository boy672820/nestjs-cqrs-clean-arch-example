import { Controller, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { User } from '@common/decorators';
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LockAccountCommand } from '../application/commands/lock-account.command';
import { LockAccountCommandResult } from '../application/commands/lock-account.result';
import type { UserPayload } from '@libs/auth';

@ApiTags('Account')
@ApiBasicAuth()
@Controller('accounts')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Lock account',
    description: 'Lock account',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Account id',
    example: '01HBTTAG5C1PDRS1K1HXRHKW1N',
  })
  @ApiOkResponse({
    description: 'Account locked',
    type: LockAccountCommandResult,
  })
  @Patch('lock/:accountId')
  lockAccount(
    @User() user: UserPayload,
    @Param('accountId') accountId: string,
  ) {
    return this.commandBus.execute(new LockAccountCommand(user.id, accountId));
  }
}
