import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): User;
  save(user: User): Promise<void>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneByConfirmationToken(token: string): Promise<User | undefined>;
  updateConfirmEmail(
    id: string,
    isEmailConfirmed: boolean,
    confirmationToken: string,
    confirmationExpires: Date,
  ): Promise<void>;
  updateResetPassword(
    id: string,
    resetPasswordToken: string,
    resetPasswordExpires: Date,
    password?: string,
  ): Promise<void>;
  findOneyByResetPasswordToken(token: string): Promise<User | undefined>;
}
