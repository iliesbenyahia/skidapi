const userModel = require('../models/user');

module.exports = {
    fetchAll : async (req, res, next) => {
        try{
            const users = await userModel.findAll();
            res.json(users);
        }catch(error){
            next(error);
        }
    },
    fetch : async (req, res, next) => {
        try {
            const user = await userModel.findByPk(req.params.id);
            res.json(user);
        }catch(error){
            next(error);
        }
    },
    create : async (req,res, next) => {
        try {
            const user = await userModel.create(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mail: req.body.mail,
                    password: req.body.password
                }
            )
            res.status(200).json(user.id);
        }
        catch(error){
            next(error);
        }
    },
    login : async (req,res,next) => {
        try{
            const user = await userModel.findOne(
                {
                    attributes: [
                        'id'
                    ],
                    where:
                        {
                            mail: req.body.mail,
                            password: req.body.password
                        }
                }
            );
            if(user != null){
                res.status(200).json(user);
            }
            else{
                throw {
                    message: "Bad credentials for login",
                    status : 401
                }
            }
        }
        catch(error){
            next(error);
        }
    }

};