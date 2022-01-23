const { Sequelize, DataTypes, Model } = require('sequelize')
const { Client } = require('pg')
require('dotenv').config();

let client, sequelize

if(process.env.MODE == 'PROD'){
  client = new Client({ 
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false 
    } 
   });
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}
else{
  client = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'ressourcesrel',
    port : 5432,
    password : 'root'
  });
  sequelize = new Sequelize(
    'ressourcesrel', 
    'postgres', 
    'root', 
    {
     host: 'localhost',
     dialect: 'postgres'
    }
 ); 
}

/*   
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
 */

module.exports = {
    db: client,
    sequelize: sequelize,
    DataTypes: DataTypes
}; 