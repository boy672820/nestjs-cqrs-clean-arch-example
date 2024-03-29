import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBasicAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from '@common/decorators';
import { UlidValidationPipe } from '@common/pipes';
import {
  ApiAccountIdParam,
  ApiNotFoundAccountResponse,
  ApiSignedToken,
} from './decorators';
import { LockAccountCommand } from '../application/commands/lock-account.command';
import { LockAccountCommandResult } from '../application/commands/lock-account.result';
import { OpenAccountCommand } from '../application/commands/open-account.command';
import { TransferCommand } from '../application/commands/transfer.command';
import { Verify2faTokenCommand } from '../application/commands/verify-2fa-token.command';
import { WithdrawCommand } from '../application/commands/withdraw.command';
import { TransferDto, WithdrawDto } from './dto';
import { Public, type UserPayload } from '@libs/auth';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('test')
  test() {
    return 'test';
  }

  @ApiOperation({
    summary: 'Withdraw',
    description:
      'This is a withdrawal API that sends the currently held tokens to the specified EOA',
  })
  @Public()
  @ApiSignedToken()
  @Post('withdraw')
  withdraw(
    @User() { userId, accountId }: { userId: string; accountId: string },
    @Body() dto: WithdrawDto,
  ) {
    return this.commandBus.execute(
      new WithdrawCommand(userId, accountId, dto.amount, dto.destAddress),
    );
  }

  @ApiOperation({
    summary: 'Transfer',
    description: 'Transfer tokens between accounts',
  })
  @ApiUnprocessableEntityResponse({ description: 'Account is locked' })
  @Public()
  @ApiSignedToken()
  @Post(':destAccountId/transfer')
  transfer(
    @User() { userId, accountId }: { userId: string; accountId: string },
    @Param('destAccountId', UlidValidationPipe) destAccountId: string,
    @Body() dto: TransferDto,
  ) {
    return this.commandBus.execute(
      new TransferCommand(userId, accountId, destAccountId, dto.amount),
    );
  }

  @ApiOperation({
    summary: 'Lock account',
    description: 'Lock account',
  })
  @ApiBasicAuth()
  @ApiAccountIdParam()
  @ApiOkResponse({
    description: 'WithAccount locked',
    type: LockAccountCommandResult,
  })
  @ApiNotFoundAccountResponse()
  @Patch(':accountId/lock')
  lockAccount(
    @User() user: UserPayload,
    @Param('accountId') accountId: string,
  ) {
    return this.commandBus.execute(new LockAccountCommand(user.id, accountId));
  }

  @ApiOperation({ summary: 'Open account', description: 'Open account' })
  @ApiBasicAuth()
  @ApiAccountIdParam()
  @ApiNoContentResponse()
  @ApiNotFoundAccountResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':accountId/open')
  openAccount(
    @User() user: UserPayload,
    @Param('accountId') accountId: string,
  ) {
    return this.commandBus.execute(new OpenAccountCommand(user.id, accountId));
  }

  @ApiOperation({
    summary: 'Verify token',
    description: 'Verifies a TOTP token',
  })
  @ApiBasicAuth()
  @ApiCreatedResponse({ description: 'Token verified' })
  @ApiConflictResponse({ description: '2FA not enabled' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiUnprocessableEntityResponse({ description: 'Account is locked' })
  @ApiForbiddenResponse({ description: 'Invalid token' })
  @Post(':accountId/otp-verify')
  verify(
    @User() user: UserPayload,
    @Param('accountId') accountId: string,
    @Headers('x-2fa-token') token: string,
  ) {
    return this.commandBus.execute(
      new Verify2faTokenCommand(user.id, accountId, token),
    );
  }
}
