const db = require('../db')
const sequelize = db.sequelize
const DataTypes = db.DataTypes

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  mail: {
    type: DataTypes.STRING
  },
  login: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}); 

module.exports = User; 