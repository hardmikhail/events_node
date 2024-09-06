import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entity/booking.entity';

export class BookingRepository{
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  save(data) {
    return this.bookingRepository.save(data)
  }

  delete(data) {
    return this.bookingRepository.delete(data)
  }

  findOneBy(data) {
    return this.bookingRepository.findOneBy(data)
  }

  find(data) {
    return this.bookingRepository.find(data)
  }
}
