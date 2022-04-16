import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import { Email } from '../shared/interfaces/email.interface';

config();

const { MAILER_USER, MAILER_PASS, MAILER_SMTP } = process.env;
const { DEFAULT_EMAIL_SENDER } = process.env;

const client = nodemailer.createTransport({
  host: MAILER_SMTP,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
});

class MailService {
  formatEmail(data: Email) {
    return {
      subject: data.subject,
      from: DEFAULT_EMAIL_SENDER,
      to: data.to,
      text: data.text,
      html: data.html,
    };
  }

  async sendEmail(data: Email) {
    const emailConfig = this.formatEmail(data);
    return client.sendMail(emailConfig);
  }
}

export default new MailService();
