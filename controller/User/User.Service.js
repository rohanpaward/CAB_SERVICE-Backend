const User = require('../../schema/user');
const { generateToken } = require('../../utils/generateToken')
const { hashPassword } = require('../../utils/hashPassword')
const { formatResponse } = require('../../utility/response-toolkit');
const { ComparePassword } = require('../../utils/hashPassword');
// Register Service
const registerService = async (payload) => {
  const existingUser = await User.findOne({ where: { email: payload?.email } });
  if (existingUser) {
    return formatResponse('User already exists', 400);
  }

  const hashed = await hashPassword(payload?.password);

  const user = await User.create({
    first_name: payload?.first_name,
    last_name: payload?.last_name,
    phone: payload?.phone,
    password: hashed,
  });

  const token = generateToken(user.id);

  // Remove password from the response
  const { password: _, ...userWithoutPassword } = user.toJSON();

  return formatResponse({ token, user: userWithoutPassword }, 201);
};


//  Login Service
const loginService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return formatResponse('User not found', 404);
  }

  const isMatch = await ComparePassword(password, user.password);
  if (!isMatch) {
    return formatResponse('Invalid credentials', 401);
  }

  const token = generateToken(user.id);

  //  Remove password from response
  const { password: _, ...userWithoutPassword } = user.toJSON();

  return formatResponse({ token, user: userWithoutPassword }, 200);
};

module.exports = {
  registerService,
  loginService,
};