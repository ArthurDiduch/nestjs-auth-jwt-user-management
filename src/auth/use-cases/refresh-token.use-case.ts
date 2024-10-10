import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dto/refrese-token.dto';
import { ValidateRefreshTokenUseCase } from './validate-refresh-token.use-case';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateRefreshTokenUseCase: ValidateRefreshTokenUseCase,
  ) {}

  async execute(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateRefreshTokenUseCase.execute(
      refreshTokenDto.refreshToken,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
