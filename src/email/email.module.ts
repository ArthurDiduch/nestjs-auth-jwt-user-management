import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';
import { SendEmailConfirmationUseCase } from './use-cases/send-email-confirmation.use-case';
import { SendEmailResetPasswordUseCase } from './use-cases/send-email-reset-password.use-case';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  providers: [
    SendEmailConfirmationUseCase,
    SendEmailResetPasswordUseCase,
    EmailProcessor,
  ],
  exports: [SendEmailConfirmationUseCase, SendEmailResetPasswordUseCase],
})
export class EmailModule {}
