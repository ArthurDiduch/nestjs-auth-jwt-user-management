import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { FindOneByEmailUseCase } from 'src/user/use-cases/find-one-by-email.use-case';
import { comparePasswords } from '../../shared/utils/compare-passwords';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly findOneByEmailUseCase: FindOneByEmailUseCase) {}

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmailUseCase.execute(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
