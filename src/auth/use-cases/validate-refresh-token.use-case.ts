import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { FindOneByEmailUseCase } from 'src/user/use-cases/find-one-by-email.use-case';

@Injectable()
export class ValidateRefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findOneByEmailUseCase: FindOneByEmailUseCase,
  ) {}

  async execute(refreshToken: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.findOneByEmailUseCase.execute(payload.email);

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
