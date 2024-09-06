import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/module/user/entity/user.entity';
import { Between, Repository } from 'typeorm';

// todo: не использовать наследование, а делать обёртку
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
//naming
  find(data){
    return this.userRepository.find(data)
  }

  save(data){
    return this.userRepository.save(data)
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
