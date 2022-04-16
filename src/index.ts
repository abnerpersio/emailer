import './jobs/mailer/run';

import express from 'express';
import 'express-async-errors';

import { routes } from './routes';
import { ErrorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(routes);
app.use(ErrorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
