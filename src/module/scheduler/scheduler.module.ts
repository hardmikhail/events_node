import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { SchedulerService } from './scheduler.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
