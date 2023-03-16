const {Schema, model} = require('mongoose');

const authSchema = new Schema({
    user:{
        type:String,
        required:[true,'Se necesita un nombre de usuario']
    },
    pass:{
        type:String,
        required:[true,'Se necesita una contraseña']
    }
});

module.exports = model('auths',authSchema);