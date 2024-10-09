import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfirmEmailUseCase } from '../../user/use-cases/confirm-email.use-case';
import { RegisterUseCase } from '../../user/use-cases/register.use-case';
import { LoginDto } from '../dto/login.dto';
import { LoginUseCase } from '../use-cases/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerUseCase.execute(createUserDto);
  }

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string): Promise<string> {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    await this.confirmEmailUseCase.execute(token);
    return 'Email successfully confirmed';
  }
}
