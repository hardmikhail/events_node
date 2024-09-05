import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { And, Equal, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { EventRepository } from './event.repository';
import { User } from '../user/entity/user.entity';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly mailerService: MailerService,
  ) {}

  async createEvent(user: User, createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    event.organizer = user;
    return await this.eventRepository.save(event);
  }

  async updateEvent(id: number, updateEventDto: CreateEventDto) {
    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new NotFoundException();
    }
    const newEvent = {
      ...updateEventDto,
      id: event.id,
      organizer: event.organizer,
    };
    return this.eventRepository.save(newEvent);
  }

  async deleteEvent(id: number) {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  getOneById(id: number) {
    return this.eventRepository.findOneById(id);
  }

  getAll() {
    return this.eventRepository.find({ relations: ['organizer'] });
  }

  getEvents(params: SearchEventDto) {
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

  // todo: мертвый код
  sendEmail() {
    this.mailerService
      .sendMail({
        to: 'test@nestjs.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: '<b>welcome</b>',
      })
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
