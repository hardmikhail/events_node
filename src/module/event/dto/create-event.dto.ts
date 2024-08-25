import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { Location } from 'src/config/types/entity.enums';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  description: string;

  @IsEnum(Location)
  location: Location;

  @IsPositive()
  price: number;

  @IsString()
  tag: string;
}
