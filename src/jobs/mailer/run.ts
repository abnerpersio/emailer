import MailService from '../../services/MailService';
import { Email } from '../../shared/interfaces/email.interface';
import { queue } from './index';

type Params = {
  data: { id: string; email: Email };
};

queue.process(async (job: Params, done) => {
  console.log(`processing job with id ${job.data.id}`);

  const response = await MailService.sendEmail(job.data.email);

  console.log(`processed job ${job.data.id} and sent message ${response?.messageId}`);

  done();
});
