const Boom = require('@hapi/boom');
const { Exception } = require('./error.toolkit');
const { logger } = require('./logger');

// ✅ Standard sendResponse for Express
const sendResponse = (serviceResponse, res) => {
  if (serviceResponse?.isBoom) {
    const { output } = serviceResponse;
    return res.status(output.statusCode).json(output.payload);
  }
  return res.status(serviceResponse.statusCode || 200).json(serviceResponse);
};

// ✅ Send file for Express
const sendFileResponse = (serviceResponse, res) => {
  if (process.env.SOURCE === 'Local') {
    return res.download(serviceResponse.data.filePath, serviceResponse.data.filename);
  }
  // for AWS: send raw file data
  return res
    .set('Content-Type', serviceResponse.data.ContentType)
    .send(serviceResponse.data.Body);
};

// ✅ Format response (same as Hapi)
const formatResponse = (data, code = 500) => {
  const options = {
    data,
    statusCode: code,
  };
  if (code >= 400) {
    const error = Boom.badRequest(data);
    logger.error(error);
    return error;
  }
  options.isBoom = false;
  return options;
};

// ✅ Token validation structure (same)
const tokenValidationResponse = (isValid, error = {}) => {
  if (isValid) return { isValid };

  const err = Exception(error?.message || 'Unauthorized', 401);
  logger.error(err);
  return err;
};

module.exports = {
  sendResponse,
  tokenValidationResponse,
  formatResponse,
  sendFileResponse,
};
