import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { LocalGuard } from './guards/local.guard';
import { UserFromRequest } from '../../common/decorators/user.decorator';
import { User } from '../user/entity/user.entity';

@ApiTags('Auth')
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
}
