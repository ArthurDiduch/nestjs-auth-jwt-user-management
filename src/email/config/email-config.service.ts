import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';

@Injectable()
export class EmailConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.configService.get<string>('email.host'),
        port: this.configService.get<number>('email.port'),
        auth: {
          user: this.configService.get<string>('email.user'),
          pass: this.configService.get<string>('email.pass'),
        },
      },
      defaults: {
        from: `"No Reply" <${this.configService.get<string>('email.from')}>`,
      },
    };
  }
}
