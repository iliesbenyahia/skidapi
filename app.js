const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 3000
/* const {Client } = require('pg') 
const db = require('./db').db 
const User  = require('./models/user').User */
const sequelize = require('./db').sequelize 

const userRoutes = require('./routes/users')
let users


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
async function connection (){
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({force: true});
  //await sequelize.sync();
} 
catch (error) {
  console.error('Unable to connect to the database:', error); 
}
}

connection(); 
//fetch form data from the request  
//app.use(bodyParser.urlencoded({extended:false}))  
  
//the request having /user/ will be send to the userRoutes module.  
//in that the rquest will be directed to the specific route.   


app.use('/user', userRoutes);  
  
//showing the port on which server is running  
app.listen(port,()=>console.log(`server running at port ${port}`));

  
module.exports = app;  