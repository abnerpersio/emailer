import MailService from '../../services/MailService';
import { queue } from './index';

queue.process(async (job, done) => {
  console.log(`processing job with id ${job.data.id}`);

  const response = await MailService.sendEmail(job.data?.email);

  console.log(`processed job ${job.data.id} and sent message ${response?.messageId}`);

  done();
});
