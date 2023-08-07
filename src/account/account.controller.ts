import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { WithdrawDto } from './dto/withdraw.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Auth()
  @Post(':accountNumber/withdraw')
  withdraw(
    @Req() req: any,
    @Param('accountNumber') accountNumber: string,
    @Body() dto: WithdrawDto,
  ) {
    return this.accountService.withdraw(req.user.id, accountNumber, dto);
  }
}
