require('dotenv').config();
const Queue = require('bull');
const { v4: uuid } = require('uuid');

const REDIS_HOST = process.env.REDIS_HOST ?? 'redis';

const queue = new Queue('mailer', {
  redis: {
    port: 6379,
    host: REDIS_HOST,
  },
});

function addQueue(data) {
  queue.add({
    id: uuid(),
    email: data,
  });
}

module.exports = {
  queue,
  addQueue,
};
