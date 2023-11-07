const {Schema, model} = require('mongoose');

const PostSchema = Schema({
    titulo:{
        type:String,
        required:[true,'Se necesita el titulo del post']
    },
    descripcion:{
        type:String,
        required:[true,'Se necesita una descripcion']
    },
    data:{
        type:Date,
        default:Date.now()
    },
    miniatura:{
        type:String,
        required:[true,'Se necesita una miniatura']
    },
    enlace:{
        type:String,
        required:[false]
    },
    tags:{
        type:String,
        required:[false]
    },
    destacado:{
        type:Boolean,
        required:[false]
    },
    orderDestacado:{
        type:Number,
        required:[false]
    }
});

module.exports = model('Post', PostSchema);