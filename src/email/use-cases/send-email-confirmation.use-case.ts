import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class SendEmailConfirmationUseCase {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async execute(email: string, token: string): Promise<void> {
    const confirmationUrl = `${process.env.APP_URL}/confirm-email?token=${token}`;

    await this.emailQueue.add('send-email', {
      email,
      subject: 'Email Confirmation',
      text: `Please confirm your email by clicking on the following link: ${confirmationUrl}`,
    });
  }
}
