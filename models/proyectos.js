const {Schema, model} = require('mongoose');

const proyectosSchema = new Schema({
    tag:{
        type:String,
        required:[true,'Se necesita indicar el tag']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    miniaturas: new Schema({
        imagen: {
            type:String,
            required:true
        },
        titulo: {
            type:String,
            required:true,
            unique:true
        },
        descripcion:{
            type:String,
            required:true
        }
    })
});

module.exports = model('Proyecto', proyectosSchema);