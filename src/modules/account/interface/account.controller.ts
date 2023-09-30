import { Body, Controller, Post, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBasicAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@common/decorators';
import { CreateWalletDto } from './dto';
import { CreateWalletCommand } from '../application/commands/create-wallet.command';
import { CreateAccountCommand } from '../application/commands/create-account.command';
import { CreateWalletCommandResult } from '../application/commands/create-wallet.command-result';
import { CreateAccountCommandResult } from '../application/commands/create-account.command-result';
import type { UserPayload } from '@libs/auth';

@ApiTags('Account')
@ApiBasicAuth()
@Controller('account')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Create wallet',
    description: 'Before creating an account, you must create a wallet',
  })
  @ApiCreatedResponse({
    description: 'Wallet created',
    type: CreateWalletCommandResult,
  })
  @ApiConflictResponse({ description: 'Account already exists' })
  @Post()
  createWallet(@User() user: UserPayload, @Body() dto: CreateWalletDto) {
    return this.commandBus.execute(
      new CreateWalletCommand(user.id, dto.password),
    );
  }

  @ApiOperation({
    summary: 'Add account',
    description: 'Create a new account in their own wallet',
  })
  @ApiCreatedResponse({
    description: 'Account created',
    type: CreateAccountCommandResult,
  })
  @Put()
  createAccount(@User() user: UserPayload) {
    return this.commandBus.execute(new CreateAccountCommand(user.id));
  }
}
