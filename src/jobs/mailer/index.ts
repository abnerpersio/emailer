import { config } from 'dotenv';

import Queue from 'bull';
import { v4 as uuid } from 'uuid';

config();

const REDIS_HOST = process.env.REDIS_HOST ?? 'redis';

const queue = new Queue('mailer', {
  redis: {
    port: 6379,
    host: REDIS_HOST,
  },
});

function addQueue(data: any) {
  queue.add({
    id: uuid(),
    email: data,
  });
}

export {
  queue,
  addQueue,
};
