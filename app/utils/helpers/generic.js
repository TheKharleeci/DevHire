import genericError from '../errors/generic';
import constants from '../constants';
import DBError from '../errors/db.error';

const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;
/**
 *Contains GenericHelper methods
 * @class GenericHelper
 */
class GenericHelper {

  /**
   * Creates DB Error object and logs it with respective error message and status.
   * @static
   * @param { String | Object } data - The data.
   * @memberof GenericHelper
   * @returns { Object } - It returns an Error Object.
   */
  static makeError({ error, status }) {
    const dbError = new DBError({
      status,
      message: error.message
    });
    GenericHelper.moduleErrLogMessager(dbError);
    return dbError;
  }

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @param {object} options.data - The payload.
   * @param {string} options.message -  HTTP Status code.
   * @param {number} options.code -  HTTP Status code.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  ) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse(req, res, error) {
    const aggregateError = { ...serverError, ...error };
    GenericHelper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    });
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof GenericHelpers
   * @returns { Null } -  It returns null.
   */
  static moduleErrLogMessager(error, status) {
    return logger.error(`${status || error.status} - ${error.name} - ${error.message}`);
  }

  /**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof GenericHelpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
}

export default GenericHelper;
