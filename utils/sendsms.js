const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSms = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${to}` // for Indian numbers (change if needed)
    });
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

module.exports = { sendSms };
