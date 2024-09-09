import { BadRequestException } from '@nestjs/common';

export function parseId(id: string) {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throw new BadRequestException();
  }
  return parsedId;
}
