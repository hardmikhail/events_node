import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

import { RegisterAuthDto } from './dto/register.auth.dto';
import { Payload } from './strategies/types/auth.types';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return user;
  }

  async register(user: RegisterAuthDto) {
    const newUser = await this.userService.createUser(user);
    return this.login(newUser);
  }

  async login(user: User) {
    return { accessToken: await this.getToken(user) };
  }

  private async getToken(user: User) {
    const payload: Payload = { id: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRATION_TIME'),
    });
    return accessToken;
  }
}
