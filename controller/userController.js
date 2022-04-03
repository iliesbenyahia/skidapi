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
        } catch (error) {
            next(error);
        }
    },

    login : async (req,res, next) => {
        try {
            const user = await userModel.findOne(
                {
                    where: {
                        mail: req.body.mail
                    }
                });
            //TODO real auth + security
            if(user === null){
                res.status(401).json(-1);
            }
            else{
                res.status(200).json(user.id);
            }
        } catch (error) {
            next(error);
        }
    }
};