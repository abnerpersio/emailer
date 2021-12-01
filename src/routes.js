const express = require('express');

const MailController = require('./controllers/MailController');

const routes = express.Router();

routes.get('/', (req, res) => res.send('Ok here!'));
routes.post('/mail', MailController.store);

module.exports = routes;
