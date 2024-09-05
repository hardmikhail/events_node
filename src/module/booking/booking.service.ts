import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equal } from 'typeorm';

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
    const isBookingExists = await this.findOneBooking(user, eventId);
    if (isBookingExists) {
      throw new ConflictException();
    }
    return this.bookingRepository.save({ user, event });
  }

  async deleteBooking(user: User, eventId: number) {
    // todo: убрать формирование запроса в сервисе
    //  {
    //       user: Equal(user.id),
    //       event: Equal(eventId),
    //   }
    const result = await this.bookingRepository.delete({
      user: Equal(user.id),
      event: Equal(eventId),
    });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  private findOneBooking(user: User, eventId: number) {
    // todo: убрать формирование запроса в сервисе
    return this.bookingRepository.findOneBy({
      user: Equal(user.id),
      event: Equal(eventId),
    });
  }
  findAll() {
    // todo: убрать формирование запроса в сервисе
    return this.bookingRepository.find({ relations: ['user', 'event'] });
  }
}
