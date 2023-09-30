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
import { AddAccountUnsafeDto, CreateWalletDto } from './dto';
import { CreateWalletCommand } from '../application/commands/create-wallet.command';
import { AddAccountUnsafeCommand } from '../application/commands/add-account-unsafe.command';
import { CreateWalletCommandResult } from '../application/commands/create-wallet.result';
import { AddAccountUnsafeCommandResult } from '../application/commands/add-account-unsafe.result';
import type { UserPayload } from '@libs/auth';

@ApiTags('Wallet')
@ApiBasicAuth()
@Controller('wallets')
export class WalletController {
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
    summary: 'Adds an account to the current wallet (unsafe).',
    description:
      'Adds an account in an unsafe manner. You must create a sub-account directly using the received private key.',
  })
  @ApiCreatedResponse({
    description: 'Account added',
    type: AddAccountUnsafeCommandResult,
  })
  @Post('accounts/unsafe')
  addAccountUnsafe(
    @User() user: UserPayload,
    @Body() dto: AddAccountUnsafeDto,
  ) {
    return this.commandBus.execute(
      new AddAccountUnsafeCommand(user.id, dto.phrase, dto.password),
    );
  }
}
