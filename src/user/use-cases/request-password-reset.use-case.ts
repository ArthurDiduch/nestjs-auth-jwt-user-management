import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SendEmailResetPasswordUseCase } from 'src/email/use-cases/send-email-reset-password.use-case';
import { FindOneByEmailUseCase } from 'src/user/use-cases/find-one-by-email.use-case';
import { v4 as uuid } from 'uuid';
import { IUserRepository } from '../repository/user.repository.interface';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly findOneByEmailUseCase: FindOneByEmailUseCase,
    private readonly sendEmailResetPasswordUseCase: SendEmailResetPasswordUseCase,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.findOneByEmailUseCase.execute(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = uuid();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1);

    await this.userRepository.updateResetPassword(
      user.id,
      resetToken,
      resetExpires,
    );

    await this.sendEmailResetPasswordUseCase.execute(user.email, resetToken);
  }
}
