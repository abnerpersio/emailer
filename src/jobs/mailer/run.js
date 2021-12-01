const MailService = require('../../services/MailService');
const { queue } = require('./index');

queue.process(async (job, done) => {
  console.log(`processing job with id ${job.data.id}`);

  const response = await MailService.sendEmail(job.data?.email);

  console.log('processed job', response);

  done();
});
