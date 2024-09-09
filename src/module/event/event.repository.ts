import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  DeepPartial,
  Equal,
  FindManyOptions,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { SearchEventDto } from './dto/search-event.dto';
import { Event } from './entity/event.entity';

export class EventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(entity: Partial<Event>) {
    return this.eventRepository.create(entity);
  }

  save(entity: DeepPartial<Event>) {
    return this.eventRepository.save(entity);
  }

  deleteById(id: number) {
    return this.eventRepository.delete(id);
  }

  find(options: FindManyOptions<Event>) {
    return this.eventRepository.find(options);
  }

  findOneById(id: number) {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });
  }

  findEvents(params: SearchEventDto) {
    const { title, description, location, tag, priceTo } = params;
    const priceFrom = params.priceFrom ?? 0;

    return this.eventRepository.find({
      where: {
        title: title ? ILike(`%${title}%`) : null,
        description: description ? ILike(`%${description}%`) : null,
        location: location ? Equal(location) : null,
        tag: tag ? ILike(`%${tag}%`) : null,
        price: priceTo
          ? And(MoreThanOrEqual(priceFrom), LessThanOrEqual(priceTo))
          : MoreThanOrEqual(priceFrom),
      },
      relations: ['organizer'],
    });
  }
}
