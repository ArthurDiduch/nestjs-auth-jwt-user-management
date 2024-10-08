import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../repository/user.repository.interface';

@Injectable()
export class FindOneByEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<User | undefined> {
    return this.userRepository.findOneByEmail(email);
  }
}
