import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { SendEmailConfirmationUseCase } from 'src/email/use-cases/send-email-confirmation.use-case';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { IUserRepository } from '../repository/user.repository.interface';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly sendEmailConfirmationUseCase: SendEmailConfirmationUseCase,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    const user = this.userRepository.create(createUserDto);

    const existEmail = await this.userRepository.findOneByEmail(user.email);

    if (existEmail) {
      throw new NotAcceptableException('Email already exists');
    }

    const confirmationToken = uuid();
    user.confirmationToken = confirmationToken;

    await this.sendEmailConfirmationUseCase.execute(
      user.email,
      confirmationToken,
    );
    await this.userRepository.save(user);
  }
}
