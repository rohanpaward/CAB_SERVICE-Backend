const { loginSchema, registerSchema } = require('./User.Validator')

// 🔹 Options for register endpoint
const registerOptions = {
  auth: false,
  tags: ['api', 'user'],
  description: 'Register a new user',
  validate: {
    payload: registerSchema,
    failAction: (request, h, err) => {
      throw err;
    },
  },
};

// 🔹 Options for login endpoint
const loginOptions = {
  auth: false,
  tags: ['api', 'user'],
  description: 'Login a user',
  validate: {
    payload: loginSchema,
    failAction: (request, h, err) => {
      throw err;
    },
  },
};

module.exports = {
  registerOptions,
  loginOptions,
};