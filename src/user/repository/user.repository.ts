import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): User {
    return this.repository.create(createUserDto);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { email: email } });
  }

  async findOneByConfirmationToken(token: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { confirmationToken: token },
    });
  }

  async updateConfirmEmail(
    id: string,
    isEmailConfirmed: boolean,
    confirmationToken: string,
  ): Promise<void> {
    const user = await this.repository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repository.update(id, { isEmailConfirmed, confirmationToken });
  }
}
