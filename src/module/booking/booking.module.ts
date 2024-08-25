import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), EventModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [],
})
export class BookingModule {}
