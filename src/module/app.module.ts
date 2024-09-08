import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmAsyncConfig } from '../config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    EventModule,
    BookingModule,
    AuthModule,
    SchedulerModule,
    MailModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
