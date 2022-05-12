const ressourcesModel = require('../models/ressources');
const ressourceCategoryModel = require('../models/ressourceCategory')
const ressourceRelationshipsModel = require('../models/relationships')

const aws = require("aws-sdk");
const userModel = require("../models/user");
const Relationships = require("../models/relationships");
const {sequelize} = require("../db");
aws.config.region = 'eu-west-3';
module.exports = {
    create: async (req, res, next) => {
        try {
            console.log(req.body);
            const ressource = await ressourcesModel.create(
                {
                    label: req.body.label,
                    description: req.body.description,
                    url : req.body.url,
                    filename: req.body.filename,
                    RessourceCategoryId : req.body.categoryID,
                    UserId : req.body.userid,

                }
            )

            //console.log(req.body.relationships);
            await ressource.addRelationships(JSON.parse(req.body.relationships));

            //console.log(ressource);
            res.status(200).json(ressource.id);
        } catch (error) {
            next(error);
        }
    },

    fetch : async (req, res, next) => {
        try {
            const ressource = await ressourcesModel.findOne({
                where: { id: req.params.id },
                include: [ressourceCategoryModel, ressourceRelationshipsModel]

            });
            //const category = await ressourceCategoryModel.findByPk(ressource.RessourceCategoryId);
            //const relationships = await ressourceRela
            //ressource.setDataValue('RessourceCategoryLabel',category.label);
            console.log(req.body);
            if(req.params.uid != null && !isNaN(req.params.uid)) {
                const [results, metadata] = await sequelize.query('SELECT * FROM favourites WHERE "favourites"."RessourceId" = ' + req.params.id + ' AND "favourites"."UserId" = ' + req.params.uid);
                console.log(results);
                if(results.length >= 1){
                    ressource.setDataValue('isFav',1);
                }
            }
            res.status(200).json(ressource);
        }catch(error){
            next(error);
        }
    },

    fetchAll: async (req,res,next) => {
        try{
            const ressourcesData = await ressourcesModel.findAll(
                {
                    include: [ressourceCategoryModel, ressourceRelationshipsModel]

                }
            );
            let ressources = [];
            if(req.params.uid == null){
                res.status(200).json(ressourcesData);
            }
            else{
                for(ressource of ressourcesData){
                    if (ressource.dataValues["UserId"] == req.params.uid) {
                        ressources.push(ressource);
                    }
                }
                res.status(200).json(ressources);
            }

            res.status(200).json(ressources);
        }catch(error){
            next(error);
        }
    },

    fetchFromCategory: async (req,res,next) => {
        try{
            const ressources = await ressourcesModel.findAll({
                where:
                    {
                        RessourceCategoryId: req.params.id,
                    },
                include: [ressourceCategoryModel, ressourceRelationshipsModel]
            });
            for(ressource of ressources){
                if(req.params.uid != null && !isNaN(req.params.uid)) {
                    const [results, metadata] = await sequelize.query('SELECT * FROM favourites WHERE "favourites"."RessourceId" = ' + ressource.dataValues["id"] + ' AND "favourites"."UserId" = ' + req.params.uid);
                    console.log(results);
                    if(results.length >= 1){
                        ressource.dataValues["isFav"] = 1;
                    }
                }

            }
            res.status(200).json(ressources);
        }catch(error){
            next(error);
        }
    },

    fetchFromUser: async (req, res, next) => {
        try{

            res.status(200).json("heelo");
        }catch(error){
            next(error);
        }
    },


    getUploadURL: async (req, res, next) => {
        try{
            const s3 = new aws.S3();
            const fileName = req.body.fileName;
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
                res.status(200).json(returnData);
            });
        }catch (error){
            next(error);
        }
    },

    addToFavourites: async (req,res,next) => {
        try {
            const ressource = await ressourcesModel.findOne({
                where: { id: req.body.ressourceid },
            });
            const user = await userModel.findOne({
                where: { id: req.body.userid },
            });
            await ressource.addUser(user);
            //const category = await ressourceCategoryModel.findByPk(ressource.RessourceCategoryId);
            //const relationships = await ressourceRela
            //ressource.setDataValue('RessourceCategoryLabel',category.label);
            res.status(200).json(ressource);
        }catch(error){
            next(error);
        }
    },

    removeFromFavourites: async (req,res,next) => {
        try {
            const ressource = await ressourcesModel.findOne({
                where: { id: req.body.ressourceid },
            });
            const user = await userModel.findOne({
                where: { id: req.body.userid },
            });
            await ressource.removeUser(user);
            //const category = await ressourceCategoryModel.findByPk(ressource.RessourceCategoryId);
            //const relationships = await ressourceRela
            //ressource.setDataValue('RessourceCategoryLabel',category.label);
            res.status(200).json(ressource);
        }catch(error){
            next(error);
        }
    },

    fetchAllFavourites : async (req,res,next) => {
        try{
            const ressources = await ressourcesModel.findAll({include: [ressourceCategoryModel, ressourceRelationshipsModel]});
            var ressourcesCollection = [];
            for(ressource of ressources){
                if(req.body.uid != null && !isNaN(req.body.uid)) {
                    const [results, metadata] = await sequelize.query('SELECT * FROM favourites WHERE "favourites"."RessourceId" = ' + ressource.dataValues["id"] + ' AND "favourites"."UserId" = ' + req.body.uid);
                    console.log(results);
                    if(results.length >= 1){
                        ressource.dataValues["isFav"] = 1;
                        ressourcesCollection.push(ressource)
                    }
                }

            }

            res.status(200).json(ressourcesCollection);
        }catch(error){
            next(error);
        }
    }



}

