const express = require('express')
require('dotenv').config()
const bodyParser = require("body-parser")
const app = express()
const aws = require('aws-sdk')
const port = process.env.PORT || 3000
const db = require('./db')
const errorModule = require('./errorHandler')
const cors = require("cors");

//Routes
const userRoutes = require('./routes/users')
const ressourcesRoutes = require('./routes/ressources')
const ressourceCategoriesRoutes = require('./routes/categories')
const relationshipsRoutes = require('./routes/relations')

const Associations = require('./models/associations');

aws.config.region = 'eu-west-3';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/user', userRoutes);
app.use('/ressources', ressourcesRoutes);
app.use('/categories', ressourceCategoriesRoutes);
app.use('/relationships', relationshipsRoutes);

app.use((err, req, res, next) => {
  errorModule.errorHandler(err,req,res,next)
})
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

app.get('/toto', (req, res) => {
  res.json("toto");
})

app.get('/leo', (req, res) => {
  res.json("je t'aime leo");
})
app.post('/syncforce', async (req, res) => {
  await sync(true);
});

let appInstance = app.listen(port,()=>{});


module.exports = appInstance;