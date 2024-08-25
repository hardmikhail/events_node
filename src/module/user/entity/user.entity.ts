import { Exclude } from 'class-transformer';
import { UserRole, Location } from 'src/config/types/entity.enums';
import { Booking } from 'src/module/booking/entity/booking.entity';
import { Event } from 'src/module/event/entity/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    nullable: true,
  })
  location: Location;

  @Column({
    nullable: true,
  })
  fullname: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
