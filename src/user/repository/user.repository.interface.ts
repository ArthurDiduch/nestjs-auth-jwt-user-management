import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): User;
  save(user: User): Promise<void>;
  findOneByEmail(email: string): Promise<User | undefined>;
}
