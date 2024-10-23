import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SendEmailConfirmationUseCase } from 'src/email/use-cases/send-email-confirmation.use-case';
import { v4 as uuid } from 'uuid';
import { IUserRepository } from '../repository/user.repository.interface';
import { FindOneByEmailUseCase } from './find-one-by-email.use-case';

@Injectable()
export class RequestConfirmEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly sendEmailConfirmationUseCase: SendEmailConfirmationUseCase,
    private readonly findOneByEmailUseCase: FindOneByEmailUseCase,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isEmailConfirmed = false;
    const confirmationToken = uuid();
    const confirmationExpires = new Date();
    confirmationExpires.setHours(confirmationExpires.getHours() + 1);

    await this.userRepository.updateConfirmEmail(
      user.id,
      isEmailConfirmed,
      confirmationToken,
      confirmationExpires,
    );

    await this.sendEmailConfirmationUseCase.execute(
      user.email,
      confirmationToken,
    );
  }
}
