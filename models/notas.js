const {Schema} = require('mongoose');

const notasSchema =  new Schema({
    tag:{
        type:String,
        required:[true,'Se necesita indicar el tag']
    },
    miniatura:newSchema({
        imagen:{
            type:String,
            required:true
        },
        titulo:{
            type:String,
            required:true,
            unique: true
        },
        descripcion:{
            type:String,
            required:true
        }
    })
});

module.exports = {notasSchema};