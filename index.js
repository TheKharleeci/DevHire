/* istanbul ignore file */
import express from 'express';
import { appConfig } from './config';
import config from './config/env';
import Logger from './config/logger';
import db from './app/db';
import { constants } from './app/utils';


const app = express();
global.logger = Logger.createLogger({ label: 'DEVHIRE' });

appConfig(app);
const port = config.PORT || 3249;

db.connect()
  .then(() => {
    logger.info('Postgres db connected');
    app.listen(port, () => {
      logger.info(`${constants.DEVHIRE_RUNNING} ${port}`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
    process.exit(1);
  });

export default app;
