const ressourcesModel = require('../models/ressources');
const ressourceCategoryModel = require('../models/ressourceCategory')

const aws = require("aws-sdk");
const userModel = require("../models/user");
aws.config.region = 'eu-west-3';
module.exports = {
    create: async (req, res, next) => {
        try {
            console.log(req.body);
            const ressource = await ressourcesModel.create(
                {
                    title: req.body.title,
                    type: req.body.fileType,
                    url : req.body.url,
                    UserId : req.body.userid
                }
            )
            res.status(200).json(ressource.id);
        } catch (error) {
            next(error);
        }
    },

    fetch : async (req, res, next) => {
        try {
            const ressource = await ressourcesModel.findByPk(req.params.id);
            res.status(200).json(ressource.id);
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

