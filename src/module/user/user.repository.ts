import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { User } from './entity/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  find() {
    return this.userRepository.find({ relations: ['events'] });
  }

  save(entity: Partial<User>) {
    return this.userRepository.save(entity);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findUsersWithAppointments(today: Date, tomorrow: Date) {
    return this.userRepository.find({
      relations: { bookings: true },
      where: {
        bookings: {
          event: {
            startDate: Between(today, tomorrow),
          },
        },
      },
    });
  }
}
