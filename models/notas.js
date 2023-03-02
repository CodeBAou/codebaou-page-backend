const {Schema,model} = require('mongoose');

const notasSchema =  new Schema({
    tag:{
        type:String,
        required:[true,'Se necesita indicar el tag']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    miniaturas:{
        imagen:{
            type:String
        },
        titulo:{
            type:String
        },
        descripcion:{
            type:String
        }
    }
});

module.exports = model('Notas',notasSchema);