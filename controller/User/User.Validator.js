const Joi = require('joi');

// ✅ Registration Schema
const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// ✅ Login Schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ✅ Export validator functions
// const validateRegister = (data) => registerSchema.validate(data);
// const validateLogin = (data) => loginSchema.validate(data);

module.exports = {
  loginSchema,
  registerSchema,
};
