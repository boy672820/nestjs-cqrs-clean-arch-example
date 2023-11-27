import { ICommand } from '@nestjs/cqrs';

/**
 * Generate secret command
 *
 * This command is used to generate a secret for the user
 * and returns a QR code image to the client
 * Streams a QR code image to the client
 */
export class GenerateSecretCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
