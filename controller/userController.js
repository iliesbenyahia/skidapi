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
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    mail: req.body.mail,
                    password: req.body.password
                }
            )
            res.status(200).json(user.id);
        } catch (error) {
            next(error);
        }
    },

    delete : async (req,res, next) => {
        try {
            const user = await userModel.destroy(
                {
                    where : { id: req.body.id }
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
                        mail: req.body.mail,
                        password: req.body.password
                    }
                });
            //TODO security
                var res2 = user.toJSON();
                delete res2.password;
                res.status(200).json(res2);

        } catch (error) {
            next(error);
        }
    }
};