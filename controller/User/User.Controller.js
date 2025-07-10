const { registerService, loginService } = require('./User.Service');
const { formatResponse } = require('../../utility/response-toolkit');
const { logger } = require('../../utility/logger');

// Register Controller
const registerHandler = async (req, res) => {
  try {
    const result = await registerService(req.body); // or req.payload if using Hapi

    if (result.isBoom) {
      const { output } = result;
      return res.status(output.statusCode).json(output.payload);
    }

    //Send user info and token
    return res.status(result.statusCode).json(result.data);
  } catch (err) {
    logger.error(err);
    const errorResponse = formatResponse(err.message, 500);
    const { output } = errorResponse;
    return res.status(output.statusCode).json(output.payload);
  }
};


// Login Controller
const loginHandler = async (req, res) => {
  try {
    const result = await loginService(req.payload || req.body);

    if (result.isBoom) {
      const { output } = result;
      return res.status(output.statusCode).json(output.payload);
    }

    return res.status(result.statusCode).json(result.data);
  } catch (error) {
    logger.error(error); // ✅ minimal error logging
    const formatted = formatResponse(error.message, 500);
    const { output } = formatted;
    return res.status(output.statusCode).json(output.payload);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
