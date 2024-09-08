import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('SMTP_HOST'),
          port: configService.getOrThrow('SMTP_PORT'),
          auth: {
            user: configService.getOrThrow('SMTP_USER'),
            pass: configService.getOrThrow('SMTP_PASS'),
          },
        },
        defaults: {
          from: configService.getOrThrow('SMTP_FROM'),
        },
      }),
    }),
  ],
})
export class MailModule {}
