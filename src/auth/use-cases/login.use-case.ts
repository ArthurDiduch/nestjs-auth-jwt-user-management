import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { ValidateUserUseCase } from './validate-user.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateUserUseCase.execute(
      loginDto.email,
      loginDto.password,
    );

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
