const { formatResponse } = require('../../utility/response-toolkit');
const { logger } = require('../../utility/logger');
const { sendOtpForRegister, verifyOtpAndRegisterUser } = require('./auth.service');

const sendOtpForRegisterHandler = async (req, res) => {
  try {
    const result = await sendOtpForRegister(req.body);

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

const verifyOtpAndRegisterUserHandler = async (req, res) => {
  try {
    const result = await verifyOtpAndRegisterUser(req.body);

    if (result.isBoom) {
      const { output } = result;
      return res.status(output.statusCode).json(output.payload); // ✅ returns error early
    }

    //  OTP verified and user created
    return res.status(result.statusCode).json(result.data);
  } catch (err) {
    console.error(err);
    const errorResponse = {
      output: {
        statusCode: 500,
        payload: { error: 'Internal Server Error' }
      }
    };
    return res.status(errorResponse.output.statusCode).json(errorResponse.output.payload);
  }
};



module.exports = {
  sendOtpForRegisterHandler,
  verifyOtpAndRegisterUserHandler
}