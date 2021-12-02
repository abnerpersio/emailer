
export interface IEmail  {
  subject?: string;
  from?: string;
  to?: string;
  text?: string;
  html?: string;
}

export interface IEmailJob {
  id: string;
  data?: IEmail;
}