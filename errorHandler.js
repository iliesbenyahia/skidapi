module.exports.errorHandler = (err, req, res, next) => {
    if(!err.hasOwnProperty('status')){
        err.status = 500;
    }
    if(!err.hasOwnProperty('message')){
        err.message = "Erreur non identifiée";
    }
    res.status(err.status);
    res.json(err);

};