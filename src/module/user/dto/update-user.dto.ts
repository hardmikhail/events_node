import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Location } from 'src/config/types/entity.enums';

export class UpdateUserDto {
  @IsEnum(Location)
  @IsOptional()
  location: Location;

  @IsString()
  @IsOptional()
  fullname: string;
}
