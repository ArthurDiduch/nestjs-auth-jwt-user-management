import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { LoginUseCase } from '../use-cases/login.use-case';
import { RegisterUseCase } from '../use-cases/register.use-case';
import { ValidateUserUseCase } from '../use-cases/validate-user.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return await this.registerUseCase.execute(createUserDto);
  }

  async login(loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto);
  }

  async validateUser(email: string, password: string) {
    return this.validateUserUseCase.execute(email, password);
  }
}
