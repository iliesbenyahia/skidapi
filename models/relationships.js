const db = require('../db')
const sequelize = db.sequelize
const DataTypes = db.DataTypes

const Relationship = sequelize.define('Relationship', {
    label: {
        type: DataTypes.STRING,
    },
});

module.exports = Relationship;