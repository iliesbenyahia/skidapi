const express = require('express')
require('dotenv').config()
const bodyParser = require("body-parser")
const app = express()
const aws = require('aws-sdk')
const port = process.env.PORT || 3000
/* const {Client } = require('pg') 
const db = require('./db').db 
const User  = require('./models/user').User */
const sequelize = require('./db').sequelize 
const errorModule = require('./errorHandler')
const cors = require("cors");

//Routes
const userRoutes = require('./routes/users')
const ressourcesRoutes = require('./routes/ressources')
const ressourceCategoriesRoutes = require('./routes/categories')
const relationshipsRoutes = require('./routes/relations')


const Associations = require('./models/associations');

aws.config.region = 'eu-west-3';
// aws.config.update({
//   signatureVersion: 'v4'
// });
app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
async function connection (){
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  //await sequelize.sync({force: true});
  await sequelize.sync();
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
app.use('/ressources', ressourcesRoutes);
app.use('/categories', ressourceCategoriesRoutes);
app.use('/relationships', relationshipsRoutes);

app.use((err, req, res, next) => {
  errorModule.errorHandler(err,req,res,next)
})

app.get('/account', (req, res) => res.render('account.html'));

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });

});
//showing the port on which server is running
app.listen(port,()=>console.log(`server running at port ${port}`));

  
module.exports = app;  