import { config } from 'dotenv';

import Queue from 'bull';
import { v4 as uuid } from 'uuid';
import { Email } from '../../shared/interfaces/email.interface';

config();

const REDIS_HOST = process.env.REDIS_HOST ?? 'redis';

export const queue = new Queue('mailer', {
  redis: {
    port: 6379,
    host: REDIS_HOST,
  },
});

export function addQueue(data: Email) {
  return queue.add({
    id: uuid(),
    email: data,
  });
}
