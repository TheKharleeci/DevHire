import ApiError from '../errors/api.error';
import constants from '../constants';

const { DB_UNIQUE_CONSTRAINTS, RESOURCE_NOT_FOUND } = constants;

/**
 *Contains ErrorFactory methods
 * @class ErrorFactory
 */
export default class ErrorFactory {
  static resolveError(error) {
    let message = 'Error while processing request. It is not you, it is us.';
    let status = 500;
    let shouldLog = true;
    if (error.code === '23505') {
      shouldLog = false;
      message = DB_UNIQUE_CONSTRAINTS[error.constraint];
      status = 409;
    }
    if (error.code === '23503') {
      shouldLog = false;
      message = DB_UNIQUE_CONSTRAINTS[error.constraint];
      status = 404;
    }
    if (error.received === 0) {
      shouldLog = false;
      status = 404;
      message = RESOURCE_NOT_FOUND(error.resource);
    }
    if (shouldLog) {
      logger.error(`${JSON.stringify(error)}`);
    }
    return new ApiError({ message, status });
  }
}
