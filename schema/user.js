// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const User = sequelize.define('User', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  socket_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users', // optional: defines table name explicitly
  timestamps: false    // adds createdAt and updatedAt fields
});

module.exports = User;
