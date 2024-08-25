import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Location, UserRole } from 'src/config/types/entity.enums';

export class CreateUserDto {
  id: number;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Location)
  location: Location;

  @IsString()
  fullname: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
