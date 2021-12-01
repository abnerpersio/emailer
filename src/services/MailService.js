require('dotenv').config();
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const { SENDGRID_TOKEN } = process.env;
const { DEFAULT_EMAIL_SENDER } = process.env;

const client = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_TOKEN,
    },
  }),
);

class MailService {
  formatEmail(data) {
    return {
      subject: data.subject,
      from: DEFAULT_EMAIL_SENDER,
      to: data.to,
      text: data.text,
      html: data.html,
    };
  }

  async sendEmail(data) {
    const emailConfig = this.formatEmail(data);
    return client.sendMail(emailConfig);
  }
}

module.exports = new MailService();
