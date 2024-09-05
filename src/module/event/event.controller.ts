import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserFromRequest } from 'src/config/decorators/user.decorator';

import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { EventService } from './event.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { OrganizerGuard } from '../auth/guards/organizer.guard';
import { EventOwnerGuard } from '../auth/guards/owner.guard';
import { User } from '../user/entity/user.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AccessTokenGuard, OrganizerGuard)
  @Post('create')
  create(
    @UserFromRequest() user: User,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.createEvent(user, createEventDto);
  }

  @Get('search')
  search(@Query() params: SearchEventDto) {
    return this.eventService.getEvents(params);
  }

  @Get(':id')
  read(@Param('id') id: number) {
    return this.eventService.getOneById(id);
  }

  @Patch('update/:id')
  @UseGuards(AccessTokenGuard, EventOwnerGuard)
  // todo: сделать отдельное dto для updateEventDto. Использовать PartialType
  update(@Param('id') id: number, @Body() updateEventDto: CreateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard, EventOwnerGuard)
  delete(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }

  @Get()
  getAll() {
    return this.eventService.getAll();
  }
}
