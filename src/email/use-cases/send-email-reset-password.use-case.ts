import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailResetPasswordUseCase {
  constructor(private readonly mailerService: MailerService) {}

  async execute(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${resetToken}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Please reset your password by clicking on the following link: ${resetUrl}`,
    });
  }
}
