import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

import { Location } from '../../../common/types/entity.enums';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsString()
  description?: string;

  @IsEnum(Location)
  location: Location;

  @IsPositive()
  price: number;

  @IsString()
  tag: string;
}
