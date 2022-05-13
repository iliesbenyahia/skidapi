const db = require('../db')
const sequelize = db.sequelize
const { DataTypes } = require('sequelize')

const Ressources = sequelize.define('Ressources', {
    label: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    filename: {
       type: DataTypes.STRING
    },
    url : {
        type : DataTypes.STRING
    },
});

module.exports = Ressources;