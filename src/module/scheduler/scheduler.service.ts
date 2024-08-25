import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';

import { UserService } from '../user/user.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const users = await this.userService.getUsersWithAppointments(
      today,
      tomorrow,
    );

    const sendMailPromises = users.map(({ email }) => {
      return this.mailerService.sendMail({
        to: email,
        subject: 'Напоминание',
        text: 'У вас назначена встреча сегодня',
      });
    });
    await Promise.all(sendMailPromises);
  }
}
