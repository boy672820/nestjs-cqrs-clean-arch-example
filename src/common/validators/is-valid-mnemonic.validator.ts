import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Mnemonic } from 'ethers';

@ValidatorConstraint({ name: 'isValidMnemonic', async: false })
class IsValidMnemonicConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    try {
      return Mnemonic.isValidMnemonic(value);
    } catch (error) {
      return false;
    }
  }

  defaultMessage = (args?: ValidationArguments): string =>
    `${args.property} is not valid mnemonic`;
}

export function IsValidMnemonic() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: IsValidMnemonicConstraint,
    });
  };
}
