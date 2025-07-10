// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Test the DB connection
// ✅ Define the function before exporting
const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(' DB connected successfully');
  } catch (error) {
    console.error(' DB connection failed:', error);
  }
};

module.exports = { sequelize, connectToDb };
