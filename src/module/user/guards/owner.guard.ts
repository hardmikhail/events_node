import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { EventRepository } from '../../event/event.repository';

@Injectable()
export class EventOwnerGuard implements CanActivate {
  constructor(private eventRepository: EventRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;
    const event = await this.eventRepository.findOneById(id);

    return event?.organizer.id === user.id;
  }
}
