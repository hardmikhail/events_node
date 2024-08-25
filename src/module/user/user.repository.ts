import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/module/user/entity/user.entity';
import { Between, Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
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
