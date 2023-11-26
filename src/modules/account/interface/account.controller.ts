import {
  Body,
  Controller,
  Headers,
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
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from '@common/decorators';
import { UlidValidationPipe } from '@common/pipes';
import { ApiAccountIdParam, ApiNotFoundAccountResponse } from './decorators';
import { LockAccountCommand } from '../application/commands/lock-account.command';
import { LockAccountCommandResult } from '../application/commands/lock-account.result';
import { OpenAccountCommand } from '../application/commands/open-account.command';
import { TransferCommand } from '../application/commands/transfer.command';
import { TransferDto } from './dto';
import type { UserPayload } from '@libs/auth';

@ApiTags('WithAccount')
@ApiBasicAuth()
@Controller('accounts')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Transfer',
    description: 'Transfer tokens between accounts',
  })
  @ApiUnprocessableEntityResponse({ description: 'Account is locked' })
  @Post('transfer/:destAccountId')
  transfer(
    @User() user: UserPayload,
    @Param('destAccountId', UlidValidationPipe) destAccountId: string,
    @Headers('x-account-id') accountId: string,
    @Body() dto: TransferDto,
  ) {
    return this.commandBus.execute(
      new TransferCommand(user.id, accountId, destAccountId, dto.amount),
    );
  }

  @ApiOperation({
    summary: 'Lock account',
    description: 'Lock account',
  })
  @ApiAccountIdParam()
  @ApiOkResponse({
    description: 'WithAccount locked',
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
