const {Schema,model} = require('mongoose');

const DiseñosSchema = Schema({
    tag:{
        type:String,
        required:[true,'Se necesita indicar el tag']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    miniaturas:{
        large:{
            type:String,
            required:[true,'La imagen es obligatoria']
        },
        short1:{
            type:String,
            required:[true,'La imagen es obligatoria']
        },
        short2:{
            type:String,
            required:[true,'La imagen es obligatoria']
        },
        short3:{
            type:String,
            required:[true,'La imagen es obligatoria']
        }
    }
 });

 module.exports = model('Diseños', DiseñosSchema);