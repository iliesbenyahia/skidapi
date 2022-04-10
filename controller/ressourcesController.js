const ressourcesModel = require('../models/ressources');
const ressourceCategoryModel = require('../models/ressourceCategory')
const ressourceRelationshipsModel = require('../models/relationships')

const aws = require("aws-sdk");
const userModel = require("../models/user");
const Relationships = require("../models/relationships");
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
                    UserId : req.body.userId,

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
            res.status(200).json(ressource);
        }catch(error){
            next(error);
        }
    },

    fetchAll: async (req,res,next) => {
        try{
            const ressource = await ressourcesModel.findAll();
            res.status(200).json(ressource);
        }catch(error){
            next(error);
        }
    },

    fetchFromCategory: async (req,res,next) => {
        try{
            const ressource = await ressourcesModel.findAll({
                where:
                    {
                        RessourceCategoryId: req.params.id,
                    },
                include: [ressourceCategoryModel, ressourceRelationshipsModel]
            });
            res.status(200).json(ressource);
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

}

