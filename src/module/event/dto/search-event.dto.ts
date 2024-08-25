import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Location } from 'src/config/types/entity.enums';

export class SearchEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Location)
  location?: Location;

  @IsOptional()
  @IsNumberString()
  priceFrom?: number;

  @IsOptional()
  @IsNumberString()
  priceTo?: number;

  @IsOptional()
  @IsString()
  tag?: string;
}
