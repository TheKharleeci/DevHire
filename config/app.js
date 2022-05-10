import morgan from 'morgan';
import compression from 'compression';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import expressFileUpload from 'express-fileupload';
import { helpers, GenericErrors, constants } from '../app/utils';
// import apiV1Routes from '../app/routes/v1';
import { redisDB } from '../app/db';

const {  errorResponse, successResponse } = helpers;
const { WELCOME, v1, REDIS_RUNNING } = constants;
const { notFoundApi } = GenericErrors;

const appConfig = (app) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(helmet());
  app.use(cors());
  app.use(json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    } }));
  app.use(compression());
  app.use(urlencoded({ extended: true }));
  app.use(expressFileUpload({ useTempFiles: true }));
  app.get('/', (_req, res) => successResponse(res, { message: WELCOME }));
  // app.use(v1, apiV1Routes);
  app.use((_req, _res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, _next) => errorResponse(req, res, err));
  redisDB.on('connect', () => logger.info(REDIS_RUNNING));
  logger.info('Redis database flushed');
};

export default appConfig;
