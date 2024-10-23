import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class SendEmailResetPasswordUseCase {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async execute(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    await this.emailQueue.add('send-email', {
      email,
      subject: 'Password Reset',
      text: `Please reset your password by clicking on the following link: ${resetUrl}`,
    });
  }
}
