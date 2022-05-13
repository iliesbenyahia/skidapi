const db = require('../db')
const sequelize = db.sequelize
const { DataTypes } = require('sequelize')


const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
  },
  status: {
    type : DataTypes.BOOLEAN,
    defaultValue: true
  }
}); 

module.exports = User; 