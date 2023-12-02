import { Body, Controller, Header, Post, StreamableFile } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@common/decorators';
import { Public, UserPayload } from '@libs/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Create user for test  and development',
  })
  @ApiNoContentResponse({ description: 'User created' })
  @Public()
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({
    summary: 'Generate secret',
    description: 'Generates a TOTP QRCode based on Google Authenticator',
  })
  @ApiCreatedResponse({
    description: 'Returns a QRCode image',
  })
  @Post('2fa/generate')
  @Header('Content-type', 'image/png')
  @Header('Content-disposition', 'attachment; filename=qr.png')
  async generate(@User() user: UserPayload) {
    const buffer = await this.userService.generateSecret(user.id);

    return new StreamableFile(buffer);
  }
}
