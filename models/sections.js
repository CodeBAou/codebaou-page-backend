const {Schema, model} = require('mongoose');

const SectionSchema = Schema({
    post:{
        type:String,
        required:[true,'Se necesita el id del post']
    },
    data:{
        text:{
            type:String,
            required:[false]
        },
        url:{
            type:String,
            required:[false]
        }
    },
    type:{
        type:Number,
        required:[false]
    },
    order:{
        type:Number,
        required:[true]
    }
    
});

module.exports = model('Sections', SectionSchema);