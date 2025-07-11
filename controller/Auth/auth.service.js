const User = require('../../schema/user');
const { hashPassword } = require('../../utils/hashPassword');
const { generateToken } = require('../../utils/generateToken');
const { sendSms } = require('../../utils/sendSms');
const otpStore = new Map();

const sendOtpForRegister = async (payload) => {
  const { first_name, last_name, phone, password } = payload;

  const existingUser = await User.findOne({ where: { phone } });
  if (existingUser) {
    return {
      isBoom: true,
      output: {
        statusCode: 400,
        payload: { error: 'Phone already registered' }
      }
    };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, {
    otp,
    payload: { first_name, last_name, phone, password },
    createdAt: Date.now()
  });

  const smsMessage = `Your OTP code is ${otp}`;
  await sendSms(phone, smsMessage);

  return {
    statusCode: 200,
    data: { message: 'OTP sent to phone number' }
  };
};
const verifyOtpAndRegisterUser = async (payload) => {
  const { phone, otp } = payload;

  const record = otpStore.get(phone);

  if (!record) {
    return {
      isBoom: true,
      output: {
        statusCode: 400,
        payload: { error: 'OTP not requested or expired' }
      }
    };
  }

  const isExpired = Date.now() - record.createdAt > 5 * 60 * 1000;

  if (record.otp !== otp || isExpired) {
    otpStore.delete(phone);
    return {
      isBoom: true,
      output: {
        statusCode: 400,
        payload: { error: 'Invalid or expired OTP' }
      }
    };
  }

  const existingUser = await User.findOne({ where: { phone } });
  if (existingUser) {
    return {
      isBoom: true,
      output: {
        statusCode: 400,
        payload: { error: 'User already exists' }
      }
    };
  }

  const hashed = await hashPassword(record.payload.password);

  const user = await User.create({
    first_name: record.payload.first_name,
    last_name: record.payload.last_name,
    phone: record.payload.phone,
    password: hashed
  });

  const token = generateToken(user.id);
  const { password: _, ...userData } = user.toJSON();

  otpStore.delete(phone);

  return {
    statusCode: 201,
    data: {
      token,
      user: userData
    }
  };
};


module.exports = {
  sendOtpForRegister,
  verifyOtpAndRegisterUser
};
