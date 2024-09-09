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
<<<<<<< Updated upstream
import { UserFromRequest } from '../../common/decorators/user.decorator';
=======
<<<<<<< Updated upstream
=======
import { UserFromRequest } from '../../common/decorators/user.decorator';
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  @Get('search')
  search(@Query() params: SearchEventDto) {
    return this.eventService.getEvents(params);
  }
<<<<<<< Updated upstream

>>>>>>> Stashed changes
  @Get(':id')
  read(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.getOneById(id);
  }

<<<<<<< Updated upstream
  @Get()
  search(@Query() params: SearchEventDto) {
    return this.eventService.getEvents(params);
  }
=======
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  @Patch('update/:id')
  @UseGuards(AccessTokenGuard, EventOwnerGuard)
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard, EventOwnerGuard)
  delete(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}
