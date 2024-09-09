import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, DeepPartial } from 'typeorm';

import { Booking } from './entity/booking.entity';

export class BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  save(entity: DeepPartial<Booking>) {
    return this.bookingRepository.save(entity);
  }

  delete(entity: Booking) {
    return this.bookingRepository.delete(entity);
  }

  deleteBooking(userId: number, eventId: number) {
    return this.bookingRepository.delete({
      user: Equal(userId),
      event: Equal(eventId),
    });
  }

  findOneById(userId: number, eventId: number) {
    return this.bookingRepository.findOneBy({
      user: Equal(userId),
      event: Equal(eventId),
    });
  }
  findAll() {
    return this.bookingRepository.find({ relations: ['user', 'event'] });
  }
}
