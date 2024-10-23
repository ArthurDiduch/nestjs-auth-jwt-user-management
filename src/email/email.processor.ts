import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('send-email')
  async handleSendEmail(job: Job<any>) {
    const { email, subject, text } = job.data;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: subject,
        text: text,
      });
    } catch (error) {
      console.error(`Erro ao enviar e-mail: ${error.message}`);
      throw error;
    }
  }
}
