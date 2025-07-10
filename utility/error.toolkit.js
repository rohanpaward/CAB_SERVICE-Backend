/**
 * Error Toolkit for Express
 * Author: Rohan
 */

const Exception = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error; // ⚠️ Don't throw here — let the controller or service handle it
};

module.exports = {
  Exception,
};
