import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export const Auth = () => applyDecorators(UseGuards(AuthGuard));
