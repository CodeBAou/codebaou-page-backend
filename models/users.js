const {Schema, model} = require('mongoose');

const authSchema = new Schema({
    email:{
        type:String,
        required:[true,'Se necesita un nombre de usuario']
    },
    nombre:{
        type:String,
        required:[true,'Se necesita una contraseña']
    },
    token:{

    },
    role:{
        type:Number,
        required:[true,'Es necesario indicar un numero de rol de usuario']
    }
});

module.exports = model('Users',authSchema);