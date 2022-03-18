const db = require('../db')
const sequelize = db.sequelize
const DataTypes = db.DataTypes

const Ressources = sequelize.define('Ressources', {
    label: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    url : {
        type : DataTypes.STRING
    },
});

module.exports = Ressources;