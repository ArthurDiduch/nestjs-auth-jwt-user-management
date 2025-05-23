import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { ConfirmEmailUseCase } from './use-cases/confirm-email.use-case';
import { FindOneByConfirmationTokenUseCase } from './use-cases/find-one-by-confirmation-token.use-case';
import { FindOneByEmailUseCase } from './use-cases/find-one-by-email.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { RequestConfirmEmailUseCase } from './use-cases/request-confirm-email.use-case';
import { RequestPasswordResetUseCase } from './use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    FindOneByEmailUseCase,
    FindOneByConfirmationTokenUseCase,
    RegisterUseCase,
    ConfirmEmailUseCase,
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
    RequestConfirmEmailUseCase,
  ],
  exports: [
    FindOneByEmailUseCase,
    FindOneByConfirmationTokenUseCase,
    RegisterUseCase,
    ConfirmEmailUseCase,
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
    RequestConfirmEmailUseCase,
  ],
})
export class UserModule {}
