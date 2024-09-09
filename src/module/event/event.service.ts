import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './event.repository';
import { User } from '../user/entity/user.entity';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(user: User, createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    event.organizer = user;
    return await this.eventRepository.save(event);
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOneById(id);
    const newEvent = {
      ...updateEventDto,
      id: event.id,
      organizer: event.organizer,
    };
    return this.eventRepository.save(newEvent);
  }

  async deleteEvent(id: number) {
    const result = await this.eventRepository.deleteById(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  getOneById(id: number) {
    return this.eventRepository.findOneById(id);
  }

  getEvents(params: SearchEventDto) {
    return this.eventRepository.findEvents(params);
  }
}
