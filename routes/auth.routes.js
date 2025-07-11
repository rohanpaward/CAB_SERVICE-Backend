const express = require('express');
const router = express.Router();
const { sendOtpForRegisterHandler, verifyOtpAndRegisterUserHandler } = require('../controller/Auth/auth.controller');
const { authEndpoints } = require('../controller/Auth/auth.endpoint');

router.post(authEndpoints.SEND_OTP, sendOtpForRegisterHandler);
router.post(authEndpoints.VERIFY_OTP, verifyOtpAndRegisterUserHandler);
// router.post(authEndpoints.LOGIN, verifyOtpAndRegisterUserHandler);

module.exports = router;
