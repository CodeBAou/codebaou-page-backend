const {Schema, model} = require('mongoose');

const PostSchema = Schema({
    pertenece:{
        type:String,
        required:[true,'Se necesita el id de la miniatura']
    },
    data_publicacion:{
        type:Date,
        default:Date.now()
    }
});

module.exports = model('Posts', PostSchema);