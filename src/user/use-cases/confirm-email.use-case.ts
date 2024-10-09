import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

    const isEmailConfirmed = true;
    const confirmationToken = null;

    await this.userRepository.updateConfirmEmail(
      user.id,
      isEmailConfirmed,
      confirmationToken,
    );
  }
}
