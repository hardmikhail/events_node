import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from '../../event/entity/event.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;
}
