import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import 'dotenv/config';

import upload from '@config/upload';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import swaggerFile from '../../../swagger.json';
import handleError from './middlewares/handleError';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);
app.use(handleError);

export { app };
