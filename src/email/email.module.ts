import { Module } from '@nestjs/common';
import { SendEmailConfirmationUseCase } from './use-cases/send-email-confirmation.use-case';

@Module({
  providers: [SendEmailConfirmationUseCase],
  exports: [SendEmailConfirmationUseCase],
})
export class EmailModule {}
