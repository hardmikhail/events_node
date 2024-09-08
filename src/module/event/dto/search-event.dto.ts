import { PartialType, PickType } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

import { CreateEventDto } from './create-event.dto';

export class SearchEventDto extends PartialType(
  PickType(CreateEventDto, ['title', 'description', 'location', 'tag']),
) {
  @IsOptional()
  @IsNumberString()
  priceFrom?: number;

  @IsOptional()
  @IsNumberString()
  priceTo?: number;
}
