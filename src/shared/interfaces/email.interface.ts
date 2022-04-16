export interface Email {
  subject?: string;
  from?: string;
  to?: string;
  text?: string;
  html?: string;
}

export interface EmailJob {
  id: string;
  data?: Email;
}
