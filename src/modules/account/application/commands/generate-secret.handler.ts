import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerAbstract } from '@common/abstracts';
import { GenerateSecretCommand } from './generate-secret.command';
import { AuthenticatorService } from '../../infrastructure';

@CommandHandler(GenerateSecretCommand)
export class GenerateSecretHandler extends CommandHandlerAbstract<GenerateSecretCommand> {
  constructor(private readonly authenticatorService: AuthenticatorService) {
    super();
  }

  async execute(command: GenerateSecretCommand) {
    const { userId } = command;

    const token = this.authenticatorService.generate(userId);

    console.log(token);
  }
}
