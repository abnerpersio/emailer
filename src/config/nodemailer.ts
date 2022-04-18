const MAILER_USER = process.env.MAILER_USER as string;
const MAILER_PASS = process.env.MAILER_PASS as string;
const MAILER_SMTP = process.env.MAILER_SMTP as string;

export const credentials = {
  host: MAILER_SMTP,
  auth: { user: MAILER_USER, pass: MAILER_PASS },
};

export const DEFAULT_EMAIL_SENDER = process.env.DEFAULT_EMAIL_SENDER as string;
