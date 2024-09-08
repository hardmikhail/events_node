import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BookingRepository } from './booking.repository';
import { EventRepository } from '../event/event.repository';
import { User } from '../user/entity/user.entity';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async createBooking(user: User, eventId: number) {
    const event = await this.eventRepository.findOneById(eventId);
    const isBookingExists = await this.findOneBooking(user.id, eventId);
    if (isBookingExists) {
      throw new ConflictException();
    }
    return this.bookingRepository.save({ user, event });
  }

  async deleteBooking(user: User, eventId: number) {
    const result = await this.bookingRepository.deleteBooking(user.id, eventId);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  private findOneBooking(userId: number, eventId: number) {
    return this.bookingRepository.findOneById(userId, eventId);
  }
  findAll() {
    return this.bookingRepository.findAll();
  }
}
