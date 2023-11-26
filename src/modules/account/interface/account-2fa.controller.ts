import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateSecretCommand } from '../application/commands/generate-secret.command';

@Controller('accounts/2fa')
export class Account2FaController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('generate')
  generate() {
    return this.commandBus.execute(new GenerateSecretCommand('1'));
  }
}
