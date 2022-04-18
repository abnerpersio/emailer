import { Request, Response } from 'express';

import { addQueue } from '../jobs/mailer';
import { Email } from '../shared/interfaces/email.interface';

import { Controller } from '../shared/interfaces/controller';

type SingleEmailRequest = Request<unknown, unknown, Partial<Email>>;
type BatchEmailRequest = Request<unknown, unknown, Partial<Email>[]>;

class MailController extends Controller {
  send = async (req: SingleEmailRequest, res: Response) => {
    this.validate(req.body, ['subject', 'to', 'text', 'html']);

    await addQueue({
      type: 'default',
      subject: req.body.subject,
      to: req.body.to,
      text: req.body.text,
      html: req.body.html,
      cc: req.body.cc ?? null,
      replyTo: req.body.replyTo ?? null,
    });

    return res.json({
      success: true,
      message: 'Email added to queue',
    });
  };

  sendAWS = async (req: SingleEmailRequest, res: Response) => {
    this.validate(req.body, ['subject', 'to', 'text', 'html']);

    await addQueue({
      type: 'aws',
      subject: req.body.subject,
      to: req.body.to,
      text: req.body.text,
      html: req.body.html,
      cc: req.body.cc ?? null,
      replyTo: req.body.replyTo ?? null,
    });

    return res.json({
      success: true,
      message: 'AWS SES email added to queue',
    });
  };

  sendBatch = async (req: BatchEmailRequest, res: Response) => {
    req.body?.forEach((item: Partial<Email>) =>
      this.validate(item, ['subject', 'to', 'text', 'html']),
    );

    await Promise.allSettled(
      req.body?.map(async (item: Partial<Email>) => {
        await addQueue({
          type: 'default',
          subject: item.subject,
          to: item.to,
          text: item.text,
          html: item.html,
          cc: item.cc ?? null,
          replyTo: item.replyTo ?? null,
        });
      }),
    );

    return res.json({
      success: true,
      message: 'Batch emails added to queue',
    });
  };
}

export default new MailController();
