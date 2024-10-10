import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/common/utils/hash-password';
import { IUserRepository } from '../repository/user.repository.interface';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneyByResetPasswordToken(token);

    if (!user || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const password = await hashPassword(newPassword);
    const resetPasswordToken = null;
    const resetPasswordExpires = null;

    await this.userRepository.updateResetPassword(
      user.id,
      resetPasswordToken,
      resetPasswordExpires,
      password,
    );
  }
}
