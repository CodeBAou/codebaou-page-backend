const {response,request}          = require('express');
const {model_post} = require('../models');

//Consultas de estadisticas de la web

const estadistica = async(req=request, res=response) => {

    try{
        //consultas de estadistica
        const total_post = await model_post.count();
        //Propiedades de estadistica que se devulven
        if(total_post){
            res.status(200).json({
                total_posts: total_post
            });
        }

    }catch( err ){
        res.status(400).json(err); 
    }

}

const totalPost = async (req=request, res=response) => {
    
    model_post.estimatedDocumentCount({}, (err, count) => {
        if (err) {
            res.status(400).json({err:err});
        } else {
            res.status(200).json({total:count});
        }
    });
}

module.exports = {
    estadistica,
    totalPost
}