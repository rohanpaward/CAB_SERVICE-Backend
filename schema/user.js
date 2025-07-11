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
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [10, 15] // optional: for Indian or international formats
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
  tableName: 'users',
  timestamps: false, // Enables createdAt and updatedAt
});

module.exports = User;
