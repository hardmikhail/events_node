import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { UserRepository } from 'src/module/user/user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const email = user.email.toLowerCase();
    const userExists = await this.userRepository.findOneByEmail(email);
    if (userExists) {
      throw new HttpException('This email already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await hash(user.password);
    user.password = hashedPassword;
    user.email = email;
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneById(id);
    const updatedUser = {
      ...user,
      fullname: updateUserDto.fullname,
      location: updateUserDto.location,
    };

    return this.userRepository.save(updatedUser);
  }

  getAll() {
    return this.userRepository.find({ relations: ['events'] });
  }

  getUsersWithAppointments(today: Date, tomorrow: Date) {
    return this.userRepository.findUsersWithAppointments(today, tomorrow);
  }
}
