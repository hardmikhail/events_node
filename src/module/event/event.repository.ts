import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Event } from './entity/event.entity';

export class EventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // todo: переопределил метод из репозитория typeOrm. Это решится, если избавиться от наследования (смотри todo в user.reposutory)
  async findOneById(id: number) {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });
  }

  create(data: DeepPartial<Event>) {
    return this.eventRepository.create(data)
  }

  save(data) {
    return this.eventRepository.save(data)
  }

  delete(data) {
    return this.eventRepository.delete(data)
  }

  find(data) {
    return this.eventRepository.find(data)
  }
}
