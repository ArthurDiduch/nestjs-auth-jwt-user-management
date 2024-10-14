import { registerAs } from '@nestjs/config';

export default registerAs('bull', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  bullRemoveOnComplete: process.env.BULL_REMOVE_ON_COMPLETE,
  bullRemoveOnFail: process.env.BULL_REMOVE_ON_FAIL,
  bullAttempts: process.env.BULL_ATTEMPTS,
  bullBackOffDelay: process.env.BULL_BACKOFF_DELAY,
}));
