import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class AccountController {}
