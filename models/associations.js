const db = require('../db')
const sequelize = db.sequelize
const { DataTypes } = require('sequelize')

//Entities
const User = require('./user');
const Ressources = require('./ressources');
const Relationships = require('./relationships');
const RessourceCategory = require('./ressourceCategory');

function setAssociation(){
// User - Ressources
    User.hasMany(Ressources);
    Ressources.belongsTo(User);
    Ressources.belongsToMany(User, {through: 'favourites'});
    User.belongsToMany(Ressources, {through: 'favourites'});
// Ressources - Relationships
    Ressources.belongsToMany(Relationships, {through: 'RessourcesRelationships'});
    Relationships.belongsToMany(Ressources, {through: 'RessourcesRelationships'});
// Ressources - Category
    Ressources.belongsTo(RessourceCategory);
}

module.exports = setAssociation();