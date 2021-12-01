require('dotenv').config();
require('./jobs/mailer/run');

const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const ErrorHandler = require('./middlewares/ErrorHandler');

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
