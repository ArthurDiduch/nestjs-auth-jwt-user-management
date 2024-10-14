import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration(): Promise<BullModuleOptions> | BullModuleOptions {
    return {
      redis: {
        host: this.configService.get<string>('bull.host', 'localhost'),
        port: this.configService.get<number>('bull.port', 6379),
      },
      defaultJobOptions: {
        attempts: this.configService.get<number>('bull.attempts', 3),
        backoff: {
          delay: this.configService.get<number>('bull.backoffDelay', 1000),
          type: 'exponential',
        },
        removeOnComplete: this.configService.get<number>(
          'bull.removeOnComplete',
          100,
        ),
        removeOnFail: this.configService.get<number>('bull.removeOnFail', 1000),
      },
    };
  }
}
