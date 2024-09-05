import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './entity/event.entity';

export class EventRepository extends Repository<Event> {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {
    super(
      eventRepository.target,
      eventRepository.manager,
      eventRepository.queryRunner,
    );
  }

  // todo: переопределил метод из репозитория typeOrm. Это решится, если избавиться от наследования (смотри todo в user.reposutory)
  async findOneById(id: number) {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });
  }
}
