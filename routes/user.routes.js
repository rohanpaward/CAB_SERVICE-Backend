
const express = require('express');
const router = express.Router();
const { registerHandler, loginHandler } = require('../controller/User/User.Controller');
const { userEndpoints } = require('../controller/User/user.endpoints');

router.post(userEndpoints.REGISTER, registerHandler);
router.post(userEndpoints.LOGIN, loginHandler);

module.exports = router;
