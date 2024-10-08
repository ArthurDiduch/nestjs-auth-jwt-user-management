import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserUseCase } from 'src/user/use-cases/create.use-case';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    await this.createUserUseCase.execute(createUserDto);
  }
}
