const User = require('../../schema/user');
const { hashPassword, comparePassword } = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const hashed = await hashPassword(password);
    const user = await User.create({ first_name, last_name, email, password: hashed });
    const token = generateToken(user.id);

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  register,
  login
}