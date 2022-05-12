const express =  require('express');  
const ressourcesController = require('../controller/ressourcesController');
const ressourceCategoryController = require('../controller/ressourceCategoriesController');
// express.Router is a class to create route handlers  
//router will contain the Router instance.  
const router = express.Router();  


/*

router.get('/', ressourcesController.fetchAll);

router.get('/:id', ressourcesController .fetch);

*/

// Ressources
router.post('/upload', ressourcesController.getUploadURL);
router.post('/', ressourcesController.create);
router.get('/all/:uid?', ressourcesController.fetchAll);
router.get('/category/:id/:uid?',ressourcesController.fetchFromCategory);
router.get('/:id/:uid?',ressourcesController.fetch);

router.post('/fav',ressourcesController.addToFavourites);
router.post('/favofuser',ressourcesController.fetchAllFavourites);
router.delete('/fav',ressourcesController.removeFromFavourites);



/*
 router.get('/:id',async (req,res)=>{
     res.send(await userController.fetch(req.params.id));
 })
 */

/*
 router.post('/', async (req,res)=>{
    
     res.send(await userController.create(req.body)); 
    //res.send(await userController.create(req.params));
})
*/


    //res.send(await userController.create(req.params));



//this route will be executed on /user/add  
//addUsers function will be called from the controller when request come for this route.  
 //router.post('/add',userController.addUsers)  
  
module.exports = router;  