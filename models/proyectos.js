const {Schema} = require('mongoose');

const proyectosSchema = new Schema({
    tag:{
        type:String,
        required:[true,'Se necesita indicar el tag']
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

module.exports = {proyectoSchema};