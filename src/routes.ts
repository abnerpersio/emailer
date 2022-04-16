import express from 'express';

import MailController from './controllers/MailController';

export const routes = express.Router();

routes.get('/', (req, res) => res.send('Ok here!'));

routes.post('/mail', MailController.send);
routes.post('/mail-batch', MailController.sendBatch);
