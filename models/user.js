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