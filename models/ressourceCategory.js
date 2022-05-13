const db = require('../db')
const sequelize = db.sequelize
const { DataTypes } = require('sequelize')

const RessourceCategory = sequelize.define('RessourceCategory', {
    label: {
        type: DataTypes.STRING
    },
});

module.exports = RessourceCategory;