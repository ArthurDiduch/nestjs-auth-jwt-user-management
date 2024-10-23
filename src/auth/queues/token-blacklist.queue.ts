import { InjectRedis } from '@nestjs-modules/ioredis';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Redis } from 'ioredis';

@Processor('token-blacklist')
export class TokenBlacklistProcessor {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Process()
  async handleTokenBlacklist(job: Job<{ token: string; exp: number }>) {
    const { token, exp } = job.data;
    const ttl = exp - Math.floor(Date.now() / 1000);

    if (ttl > 0) {
      await this.redis.set(`blacklist:${token}`, 'blacklisted', 'EX', ttl);
    }
  }
}
