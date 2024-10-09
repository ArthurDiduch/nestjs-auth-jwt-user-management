import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailConfirmationUseCase {
  constructor(private readonly mailerService: MailerService) {}

  async execute(email: string, token: string): Promise<void> {
    const confirmationUrl = `${process.env.APP_URL}/auth/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      text: `Please confirm your email by clicking on the following link: ${confirmationUrl}`,
    });
  }
}
