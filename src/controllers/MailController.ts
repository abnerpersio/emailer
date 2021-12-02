import { Request, Response } from "express";

import { addQueue } from '../jobs/mailer';
import RequestError from '../shared/errors/RequestError';

class MailController {
  validate = (data: any, validations: string[]) => {
    validations.forEach((item) => {
      if (!data || !data[item]) {
        throw new RequestError(
          `Invalid value "${data[item]}" for "${item}" field`,
          400,
        );
      }
    });
  };

  store = (req: Request, res: Response) => {
    this.validate(req.body, ['subject', 'to', 'text', 'html']);

    addQueue({
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
}

export default new MailController();
