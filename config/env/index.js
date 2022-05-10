import rootPath from 'app-root-path';
import development from './development';
import test from './test';

const {
  PORT,
  DEVHIRE_SECRET: SECRET,
  DEVHIRE_REFRESH_SECRET: REFRESH_SECRET,
  DEVHIRE_NODE_ENV: NODE_ENV
} = process.env;

const currentEnv = {
  development,
  test,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  REFRESH_SECRET,
  NODE_ENV
};
