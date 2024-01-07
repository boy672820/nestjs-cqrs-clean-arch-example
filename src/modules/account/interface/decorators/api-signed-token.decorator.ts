import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SignedTokenGuard } from '../guards';

export function ApiSignedToken() {
  return applyDecorators(
    ApiBearerAuth('signed-token'),
    UseGuards(SignedTokenGuard),
  );
}
