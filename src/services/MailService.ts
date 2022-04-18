import { config } from 'dotenv';
import nodemailer, { SendMailOptions } from 'nodemailer';
import { Email } from '../shared/interfaces/email.interface';
import { AWS_EMAIL_SENDER, ses } from '../config/aws';
import { credentials, DEFAULT_EMAIL_SENDER } from '../config/nodemailer';

config();

const smtpClient = nodemailer.createTransport(credentials);
const awsClient = nodemailer.createTransport({ SES: ses });

class MailService {
  private formatEmail(data: Email, from: string): SendMailOptions {
    return {
      subject: data.subject,
      from,
      to: data.to,
      text: data.text,
      html: data.html,
      replyTo: data.replyTo,
      cc: data.cc,
    };
  }

  private async sendAWSEmail(data: Email) {
    const emailConfig = this.formatEmail(data, AWS_EMAIL_SENDER);
    return awsClient.sendMail(emailConfig);
  }

  private async sendDefaultEmail(data: Email) {
    const emailConfig = this.formatEmail(data, DEFAULT_EMAIL_SENDER);
    return smtpClient.sendMail(emailConfig);
  }

  async sendEmail(data: Email) {
    const { type } = data;

    if (type === 'aws') return this.sendAWSEmail(data);
    if (type === 'default') return this.sendDefaultEmail(data);

    return;
  }
}

export default new MailService();
