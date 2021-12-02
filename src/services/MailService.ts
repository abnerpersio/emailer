import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import { IEmail } from '../shared/interfaces/email.interface';

config();

const { MAILER_USER } = process.env;
const { MAILER_PASS } = process.env;
const { DEFAULT_EMAIL_SENDER } = process.env;

const client = nodemailer.createTransport({
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
});

class MailService {
  formatEmail(data: IEmail) {
    return {
      subject: data.subject,
      from: DEFAULT_EMAIL_SENDER,
      to: data.to,
      text: data.text,
      html: data.html,
    };
  }

  async sendEmail(data: IEmail) {
    const emailConfig = this.formatEmail(data);
    return client.sendMail(emailConfig);
  }
}

export default new MailService();
