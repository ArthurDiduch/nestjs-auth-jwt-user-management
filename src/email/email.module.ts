import { Module } from '@nestjs/common';
import { SendEmailConfirmationUseCase } from './use-cases/send-email-confirmation.use-case';
import { SendEmailResetPasswordUseCase } from './use-cases/send-email-reset-password.use-case';

@Module({
  providers: [SendEmailConfirmationUseCase, SendEmailResetPasswordUseCase],
  exports: [SendEmailConfirmationUseCase, SendEmailResetPasswordUseCase],
})
export class EmailModule {}
