import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { FindOneByConfirmationTokenUseCase } from 'src/user/use-cases/find-one-by-confirmation-token.use-case';
import { IUserRepository } from '../repository/user.repository.interface';

@Injectable()
export class ConfirmEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly findOneByConfirmationTokenUseCase: FindOneByConfirmationTokenUseCase,
  ) {}

  async execute(token: string): Promise<void> {
    const user = await this.findOneByConfirmationTokenUseCase.execute(token);

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    if (user.confirmationExpires < new Date()) {
      throw new NotAcceptableException('Confirmation token has expired');
    }

    const isEmailConfirmed = true;
    const confirmationToken = null;
    const confirmationExpires = null;

    await this.userRepository.updateConfirmEmail(
      user.id,
      isEmailConfirmed,
      confirmationToken,
      confirmationExpires,
    );
  }
}
