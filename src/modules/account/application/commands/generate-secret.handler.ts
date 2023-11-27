import { Inject, StreamableFile } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateSecretCommand } from './generate-secret.command';
import { IAuthenticatorService } from '../adapters/authenticator.service.interface';
import { InjectionToken } from '../../account.constants';

@CommandHandler(GenerateSecretCommand)
export class GenerateSecretHandler
  implements ICommandHandler<GenerateSecretCommand, StreamableFile>
{
  constructor(
    @Inject(InjectionToken.AUTHENTICATOR)
    private readonly authenticatorService: IAuthenticatorService,
  ) {}

  async execute(command: GenerateSecretCommand) {
    const { userId } = command;

    const { otpAuthUrl } = this.authenticatorService.generate(userId);

    const base64Qrcode = await this.authenticatorService.toDataURL(otpAuthUrl);

    const buffer = Buffer.from(
      base64Qrcode.replace('data:image/png;base64,', ''),
      'base64',
    );

    return new StreamableFile(buffer);
  }
}
