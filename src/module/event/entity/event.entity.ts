import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
import { Location } from '../../../common/types/entity.enums';
import { Booking } from '../../booking/entity/booking.entity';
import { User } from '../../user/entity/user.entity';

<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

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
  bookings?: Booking[];
}
