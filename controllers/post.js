const {response,request} =require('express');
const {model_post} = require('../models');

const obtenerPost = async(req=request, res=response) => {
    
    const id = req.params.id;
    console.log(id);
    try{
        await model_post.find({pertenece:`${id}`})
        .then( post => {
            res.status(200).json(post);
        })
        .catch( err => {
            res.status(500).json(err);
        });
    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
   
}

const obtenerPosts = async(req=request, res=response) => {

    const {desde,limite} = req.query;
    
    try{
        await model_post.find().skip(desde).limit(limite)
        .then( posts => {
            if(!posts) res.status(200).json( {msg:'No se encontro ningun post'});
            if(posts) res.status(200).json(posts);
        })
        .catch( err => {
            res.status(500).json({
                msg:"Error al realizar la consulta en la base de datos",
                err
            });
        });
    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
  
}

const crearPost = async (req=request, res=response) => {

    const post  = new model_post(req.body);

    try{
        await post.save( (err,result) => {

            if(err) res.status(500).json({
                msg:"Error al guardar una nuevo post",
                err:err
            });

            if(result){
                res.status(200).json({
                    msg:"Se ha guardado un nuevo post",
                    result
                });
                
            }
          
        });

    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
    
}

const actualizarPost = async (req=request, res=response ) => {

    const id    = req.params.id;
    const query = req.body;

    try{

        await model_post.findByIdAndUpdate( {_id:id}, query )
        .then(
            result => res.status(200).json(result)
        )
        .catch(
            err => res.status(500).json(err)
        );

    }catch(err){

        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
    
}

const eliminaPost = async (req=request, res=response) => {

    const id = req.params.id;

    try{

        await model_post.findByIdAndDelete( {_id:id} )
        .then( result => {

            if(!result) res.status(200).json({
                msg:`No se ha encontrado ningun post con el id ${id}`
            });

            if(result) res.status(200).json(result)
        })
        .catch( err => res.status(500).json(err));

    }catch(err){

        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
    
}

const eliminarALLpost = async (req=require,res=response) => {
    await model_post.deleteMany({})
        .then(result=>{
            res.status(200).json({msg:"Se han eliminado todos los posts"});
        })
        .catch(err => {
            res.status(500).json({
                msg:"No se ha podido eliminar los posts",
                err:err
             })
        });
}

module.exports = {
    obtenerPost,
    obtenerPosts,
    crearPost,
    actualizarPost,
    eliminaPost,
    eliminarALLpost
}