import './dotenv';
import aws from 'aws-sdk';

aws.config.update({ region: process.env.AWS_REGION || 'us-east-1' });

aws.config.credentials = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_ACCESS_TOKEN || '',
});

export const ses = new aws.SES({ apiVersion: '2010-12-01' });

export const AWS_EMAIL_SENDER = process.env.AWS_EMAIL_SENDER as string;
