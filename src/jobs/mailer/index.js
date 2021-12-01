const Queue = require('bull');

const queue = new Queue('mailer', { 
  redis: { 
    port: 6379, 
    host: 'redis'
  }
});

module.exports = queue;