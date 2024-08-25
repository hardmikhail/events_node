import { Event } from 'src/module/event/entity/event.entity';
import { User } from 'src/module/user/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;
}
