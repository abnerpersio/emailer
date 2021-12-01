const { addQueue } = require('../jobs/mailer');
const RequestError = require('../shared/errors/RequestError');

class MailController {
  validate = (data, validations) => {
    validations.forEach((item) => {
      if (!data || !data[item]) {
        throw new RequestError(`Invalid value "${data[item]}" for "${item}" field`, 400);
      }
    });
  };

  store = (req, res) => {
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

module.exports = new MailController();
