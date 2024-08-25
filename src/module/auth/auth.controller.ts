import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserFromRequest } from 'src/config/decorators/user.decorator';

import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalGuard } from './guards/local.guard';
import { User } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: RegisterAuthDto) {
    return this.authService.register(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  login(@UserFromRequest() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout() {
    return 1;
  }
}
