import { Request, Response } from 'express';

import { addQueue } from '../jobs/mailer';
import { Email } from '../shared/interfaces/email.interface';

import { Controller } from '../shared/interfaces/controller';

class MailController extends Controller {
  send = async (req: Request, res: Response) => {
    this.validate(req.body, ['subject', 'to', 'text', 'html']);

    await addQueue({
      subject: req.body.subject,
      to: req.body.to,
      text: req.body.text,
      html: req.body.html,
    });
    res.json({
      success: true,
      message: 'Email added to queue',
    });
  };

  sendBatch = async (req: Request, res: Response) => {
    req.body?.forEach((item: Email) => this.validate(item, ['subject', 'to', 'text', 'html']));

    await Promise.all(
      req.body?.map(async (item: Email) => {
        await addQueue({
          subject: item.subject,
          to: item.to,
          text: item.text,
          html: item.html,
        });

        return true;
      }),
    );

    res.json({
      success: true,
      message: 'Batch emails added to queue',
    });
  };
}

export default new MailController();
