import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UlidValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    value = value.toUpperCase();

    if (!/^[0-9A-HJKMNP-TV-Z]{26}$/.test(value)) {
      throw new BadRequestException('Invalid ULID');
    }

    return value;
  }
}
