const ressourceCategoryModel = require('../models/ressourceCategory')

const aws = require("aws-sdk");
const userModel = require("../models/user");
const ressourcesModel = require("../models/ressources");
aws.config.region = 'eu-west-3';
module.exports = {

    create: async (req,res,next) => {
        try{
            console.log(req.body);
            const category = await ressourceCategoryModel.create({
                title: req.body.title,
            });
            res.status(200).json(ressource);
        }catch(error){
            next(error);
        }
    },

    fetchAll: async (req,res,next) => {
        try{
            const categories = await ressourceCategoryModel.findAll();
            res.status(200).json(categories);
        }catch(error){
            next(error);
        }
    },



}

