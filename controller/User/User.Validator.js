const Joi = require('joi');

// ✅ Registration Schema
const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  phone: Joi.number().min(10).max(15).required(),
  password: Joi.string().min(6).required(),
});

// ✅ Login Schema
const loginSchema = Joi.object({
  phone: Joi.number().min(10).max(15).required(),
  password: Joi.string().min(6).required(),
});

// ✅ Export validator functions
// const validateRegister = (data) => registerSchema.validate(data);
// const validateLogin = (data) => loginSchema.validate(data);

module.exports = {
  loginSchema,
  registerSchema,
};
