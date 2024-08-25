import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entity/booking.entity';

export class BookingRepository extends Repository<Booking> {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {
    super(
      bookingRepository.target,
      bookingRepository.manager,
      bookingRepository.queryRunner,
    );
  }
}
