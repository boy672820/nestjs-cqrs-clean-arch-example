import { Controller, Get, Header } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UserPayload } from '@libs/auth';
import { User } from '@common/decorators';
import { GenerateSecretCommand } from '../application/commands/generate-secret.command';

@ApiTags('2FA')
@ApiBasicAuth()
@Controller('accounts/2fa')
export class Account2FaController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Generate secret',
    description: 'Generates a TOTP QRCode based on Google Authenticator',
  })
  @ApiOkResponse({
    description: 'Returns a QRCode image',
  })
  @Get('generate')
  @Header('Content-type', 'image/png')
  @Header('Content-disposition', 'attachment; filename=qr.png')
  generate(@User() user: UserPayload) {
    return this.commandBus.execute(new GenerateSecretCommand(user.id));
  }
}
