import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './use-cases/create.use-case';
import { FindOneByEmailUseCase } from './use-cases/find-one-by-email.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    CreateUserUseCase,
    FindOneByEmailUseCase,
  ],
  exports: [CreateUserUseCase, FindOneByEmailUseCase],
})
export class UserModule {}
