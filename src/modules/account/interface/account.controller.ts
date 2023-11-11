import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBasicAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@common/decorators';
import { ApiAccountIdParam, ApiNotFoundAccountResponse } from './decorators';
import { LockAccountCommand } from '../application/commands/lock-account.command';
import { LockAccountCommandResult } from '../application/commands/lock-account.result';
import { OpenAccountCommand } from '../application/commands/open-account.command';
import type { UserPayload } from '@libs/auth';

@ApiTags('Account')
@ApiBasicAuth()
@Controller('accounts')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Transfer',
    description: 'Transfer tokens between accounts',
  })
  @Post('transfer/:accountId')
  transfer() {}

  @ApiOperation({
    summary: 'Lock account',
    description: 'Lock account',
  })
  @ApiAccountIdParam()
  @ApiOkResponse({
    description: 'Account locked',
    type: LockAccountCommandResult,
  })
  @ApiNotFoundAccountResponse()
  @Patch('lock/:accountId')
  lockAccount(
    @User() user: UserPayload,
    @Param('accountId') accountId: string,
  ) {
    return this.commandBus.execute(new LockAccountCommand(user.id, accountId));
  }

  @ApiOperation({ summary: 'Open account', description: 'Open account' })
  @ApiAccountIdParam()
  @ApiNoContentResponse()
  @ApiNotFoundAccountResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('open/:accountId')
  openAccount(
    @User() user: UserPayload,
    @Param('accountId') accountId: string,
  ) {
    return this.commandBus.execute(new OpenAccountCommand(user.id, accountId));
  }
}
