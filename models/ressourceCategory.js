const db = require('../db')
const sequelize = db.sequelize
const DataTypes = db.DataTypes

const RessourceCategory = sequelize.define('RessourceCategory', {
    title: {
        type: DataTypes.STRING
    },
});

module.exports = RessourceCategory;