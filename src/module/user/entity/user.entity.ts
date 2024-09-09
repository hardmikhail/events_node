import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
import { UserRole, Location } from '../../../common/types/entity.enums';
import { Booking } from '../../booking/entity/booking.entity';
import { Event } from '../../event/entity/event.entity';

<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: Location,
  })
  location: Location;

  @Column()
  fullname: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Event, (event) => event.organizer)
  events?: Event[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings?: Booking[];
}
