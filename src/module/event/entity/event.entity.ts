import { Location } from 'src/config/types/entity.enums';
import { Booking } from 'src/module/booking/entity/booking.entity';
import { User } from 'src/module/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User, (organizer) => organizer.events)
  organizer: User;

  @Column()
  title: string;

  @Column('timestamptz')
  startDate: Date;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: Location,
  })
  location: Location;

  @Column()
  price: number;

  @Column()
  tag: string;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
