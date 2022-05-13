const { Sequelize, DataTypes } = require('sequelize')
const { Client } = require('pg')
require('dotenv').config();

let database, sequelize

if(process.env.MODE == 'PROD'){
  client = new Client({ 
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false 
    },

   });
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
      logging: false
  });
}
else{
  database = new Client({
    user : 'root',
    //host : '172.18.0.2',
      host: 'localhost',
    database : 'ressourcesrel',
    port : 5432,
    password : 'root'
  });
  sequelize = new Sequelize(
     'ressourcesrel',
      //'root',
      'postgres',
    'root', 
    {
        //host : '172.18.0.2',
        host: 'localhost',
     dialect: 'postgres'
    }
 ); 
}


async function sync(forcesync = false) {
    try {
        await sequelize.sync({force: forcesync});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function connection (){
    try {
        await sequelize.authenticate();
        //console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connection();


module.exports = {
    database: database,
    sequelize: sequelize,
}; 