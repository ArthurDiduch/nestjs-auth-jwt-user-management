import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../repository/user.repository.interface';

@Injectable()
export class FindOneByConfirmationTokenUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(token: string): Promise<User | undefined> {
    return this.userRepository.findOneByConfirmationToken(token);
  }
}
