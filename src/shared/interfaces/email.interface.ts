export interface Email {
  type: 'default' | 'aws';
  subject?: string;
  to?: string;
  text?: string;
  html?: string;
  replyTo?: string | null;
  cc?: string | string[] | null;
}

export interface EmailJob {
  id: string;
  data?: Email;
}
