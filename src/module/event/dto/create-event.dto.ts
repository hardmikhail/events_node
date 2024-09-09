import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
<<<<<<< Updated upstream

import { Location } from '../../../common/types/entity.enums';
=======
<<<<<<< Updated upstream
import { Location } from 'src/config/types/entity.enums';
=======

import { Location } from '../../../common/types/entity.enums';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

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
