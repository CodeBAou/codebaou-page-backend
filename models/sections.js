const  {Schema , model, Types } = require('mongoose');

const SectionSchema = Schema({
    post:{
        type:Types.ObjectId
    },
    parrafo:{
        type:String,
        required:[false]
    },
    img:{
        type:String,
        required:[false]
    },
    type:{
        type:Number,
        required:[true,"Se necesita definir el patron de diseño con type"]
    },
    order:{
        type:Number,
        required:[true,"Se necesita un numero de orden"],
        unique:true 
    }
});

module.exports = model('Sections', SectionSchema);