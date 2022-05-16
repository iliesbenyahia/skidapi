const { Sequelize, DataTypes, Model } = require('sequelize')
const { Client } = require('pg')
require('dotenv').config();

 const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,

    });

  

module.exports = sequelize; 