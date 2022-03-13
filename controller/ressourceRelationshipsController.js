const ressourceRelationshipsModel = require('../models/relationships')

const aws = require("aws-sdk");
aws.config.region = 'eu-west-3';
module.exports = {

    create: async (req,res,next) => {
        try{
            console.log(req.body);
            const relationship = await ressourceRelationshipsModel.create({
                type: req.body.type,
            });
            res.status(200).json(relationship);
        }catch(error){
            next(error);
        }
    },

    fetchAll: async (req,res,next) => {
        try{
            const relationships = await ressourceRelationshipsModel.findAll();
            res.status(200).json(relationships);
        }catch(error){
            next(error);
        }
    },



}

