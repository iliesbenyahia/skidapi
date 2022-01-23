const db = require('../db')
const sequelize = db.sequelize
const DataTypes = db.DataTypes

const Relationship = sequelize.define('Relationship', {
    title: {
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
    }
});

module.exports = Relationship;