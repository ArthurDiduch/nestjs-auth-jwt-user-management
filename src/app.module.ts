import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BullConfigService } from './config/bull-config.service';
import envConfig from './config/database.config';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { EmailConfigService } from './email/config/email-config.service';
import emailConfig from './email/config/email.config';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig, emailConfig],
    }),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: EmailConfigService,
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    UserModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
