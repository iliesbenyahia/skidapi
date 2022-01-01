const express =  require('express');  
const userControler = require('../controller/userController.js');  

// express.Router is a class to create route handlers  
//router will contain the Router instance.  
const router = express.Router();  
  
router.get('/',async (req,res)=>{
    res.send(await userControler.fetchAll());
}) 
 
 router.get('/:id',async (req,res)=>{
     res.send(await userControler.fetch(req.params.id));
 })  
  
 router.post('/', async (req,res)=>{
    
     res.send(await userControler.create(req.body)); 
    //res.send(await userControler.create(req.params));
})  
//this route will be executed on /user/add  
//addUsers function will be called from the controller when request come for this route.  
 //router.post('/add',userControler.addUsers)  
  
module.exports = router;  