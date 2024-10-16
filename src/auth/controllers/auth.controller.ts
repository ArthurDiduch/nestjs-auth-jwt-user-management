import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RequestPasswordResetDto } from 'src/user/dto/request-password-reset.dto';
import { ResetPasswordDto } from 'src/user/dto/reset-password.dto';
import { RequestConfirmEmailUseCase } from 'src/user/use-cases/request-confirm-email.use-case';
import { RequestPasswordResetUseCase } from 'src/user/use-cases/request-password-reset.use-case';
import { ResetPasswordUseCase } from 'src/user/use-cases/reset-password.use-case';
import { ConfirmEmailUseCase } from '../../user/use-cases/confirm-email.use-case';
import { RegisterUseCase } from '../../user/use-cases/register.use-case';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refrese-token.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
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
    private readonly requestConfirmEmailUseCase: RequestConfirmEmailUseCase,
  ) {}

  @HttpCode(201)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @HttpCode(204)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerUseCase.execute(createUserDto);
  }

  @HttpCode(201)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(refreshTokenDto);
  }

  @HttpCode(204)
  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.requestPasswordResetUseCase.execute(
      requestPasswordResetDto.email,
    );
  }

  @HttpCode(204)
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }

  @HttpCode(204)
  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    await this.confirmEmailUseCase.execute(token);
  }

  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @Get('request-confirm-email')
  async requestConfirmEmail(@CurrentUser() user: any) {
    await this.requestConfirmEmailUseCase.execute(user.email);
  }
}
