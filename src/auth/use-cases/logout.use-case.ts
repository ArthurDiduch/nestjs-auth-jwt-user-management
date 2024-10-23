import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Queue } from 'bull';

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @InjectQueue('token-blacklist') private readonly blacklistQueue: Queue,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const exp = decoded.exp;

      await this.blacklistQueue.add({ token: refreshToken, exp });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
