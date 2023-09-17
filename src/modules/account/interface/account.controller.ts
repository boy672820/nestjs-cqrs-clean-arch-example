import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@common/decorators';
import { CreateWalletDto } from './dto';
import { CreateWalletCommand } from '../application/commands/create-wallet.command';
import type { UserPayload } from '@libs/auth';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create account' })
  @ApiBasicAuth()
  @ApiCreatedResponse({
    description: 'Account created',
    schema: {
      type: 'object',
      properties: {
        phrase: {
          type: 'string',
          description: 'Wallet phrase',
          example:
            'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
        },
        id: {
          type: 'string',
          format: 'ulid',
          description: 'Account ID (ULID)',
          example: '01h9z32d127prt1j3s77xwf5d4',
        },
        accountAddress: {
          type: 'string',
          format: 'address',
          description: 'Account address',
          example: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
        },
        balance: {
          type: 'string',
          format: 'uint256',
          description: 'Account balance',
          example: '100000000000000000000',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Account creation date',
          example: '2021-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @Post()
  createWallet(@User() user: UserPayload, @Body() dto: CreateWalletDto) {
    return this.commandBus.execute(
      new CreateWalletCommand(user.id, dto.password),
    );
  }
}
