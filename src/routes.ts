import express from 'express';

import MailController from './controllers/MailController';

const routes = express.Router();

routes.get('/', (req, res) => res.send('Ok here!'));

routes.post('/mail', MailController.store);
routes.post('/mail-batch', MailController.storeBatch);

export default routes;
