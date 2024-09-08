import { Body, Get, Patch, UseGuards, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserFromRequest } from '../../config/decorators/user.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Patch('update')
  updateUser(
    @UserFromRequest() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }
}
