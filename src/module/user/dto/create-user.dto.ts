import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
<<<<<<< Updated upstream

import { Location, UserRole } from '../../../common/types/entity.enums';
=======
<<<<<<< Updated upstream
import { Location, UserRole } from 'src/config/types/entity.enums';
=======

import { Location, UserRole } from '../../../common/types/entity.enums';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Location)
  location: Location;

  @IsString()
  fullname: string;

  @ApiProperty({ default: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
