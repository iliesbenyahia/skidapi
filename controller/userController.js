const userModel = require('../models/user');  

module.exports = { 
    async fetchAll(){
        const users = await userModel.findAll();
        console.log(users);
        return JSON.stringify(users);
    },

    async fetch(id){
        const user = await userModel.findByPk(id);
        return JSON.stringify(user);
    },

    async create(data){
        console.log(data)
        const user = await userModel.create(
            {
                firstName: data.firstName,
                lastName: data.lastName,
                mail: data.mail,
                password: data.password,
                login: data.login
            }
        ) 

    }

};  