const ObjectId = require('mongoose').Types.ObjectId;

//Verifica si un string es ObjectId de mongo
function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports = {
    isValidObjectId
}