import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';
import { FindOneByEmailUseCase } from '../use-cases/find-one-by-email.use-case';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly findOneByEmailUseCase: FindOneByEmailUseCase) {}

  @HttpCode(200)
  @Get('/:email')
  async FindOneByEmailUseCase(@Param('email') email: string): Promise<User> {
    const user = await this.findOneByEmailUseCase.execute(email);

    delete user.password;
    delete user.resetPasswordToken;
    delete user.confirmationToken;

    return user;
  }
}
