import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RequestPasswordResetDto } from 'src/user/dto/request-password-reset.dto';
import { ResetPasswordDto } from 'src/user/dto/reset-password.dto';
import { RequestPasswordResetUseCase } from 'src/user/use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from 'src/user/use-cases/reset-password.use-case';
import { ConfirmEmailUseCase } from '../../user/use-cases/confirm-email.use-case';
import { RegisterUseCase } from '../../user/use-cases/register.use-case';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refrese-token.dto';
import { LoginUseCase } from '../use-cases/login.use-case';
import { RefreshTokenUseCase } from '../use-cases/refresh-token.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerUseCase.execute(createUserDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(refreshTokenDto);
  }

  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.requestPasswordResetUseCase.execute(
      requestPasswordResetDto.email,
    );
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
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
