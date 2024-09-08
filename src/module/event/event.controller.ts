import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { UserFromRequest } from '../../config/decorators/user.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { User } from '../user/entity/user.entity';
import { OrganizerGuard } from '../user/guards/organizer.guard';
import { EventOwnerGuard } from '../user/guards/owner.guard';

@ApiTags('Event')
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

  @Get(':id')
  read(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.getOneById(id);
  }

  @Get()
  search(@Query() params: SearchEventDto) {
    return this.eventService.getEvents(params);
  }
  // FIXME: не работает при id = string
  @Patch('update/:id')
  @UseGuards(AccessTokenGuard, EventOwnerGuard)
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  // FIXME: не работает при id = string
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard, EventOwnerGuard)
  delete(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}
