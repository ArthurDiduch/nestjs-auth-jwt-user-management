import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): User {
    const user = this.repository.create(createUserDto);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email: email } });
  }
}
