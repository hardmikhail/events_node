import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BookingService } from './booking.service';
import { UserFromRequest } from '../../common/decorators/user.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { User } from '../user/entity/user.entity';

@ApiTags('Booking')
@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('event/:id/book')
  @UseGuards(AccessTokenGuard)
  createBooking(@UserFromRequest() user: User, @Param('id') eventId: number) {
    return this.bookingService.createBooking(user, eventId);
  }

  @Delete('event/:id/unbook')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  deleteBooking(@UserFromRequest() user: User, @Param('id') eventId: number) {
    return this.bookingService.deleteBooking(user, eventId);
  }

  @Get('booking')
  findAll() {
    return this.bookingService.findAll();
  }
}
