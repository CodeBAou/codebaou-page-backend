const {request,response} = require('express');
const {model_proyectos} = require('../models');

const obtenerProyecto = async (req, res=response) => {
    
    const id = req.params.id;

    try{
        await model_proyectos.findById( req.params.id )
        .then( proyecto => {
            res.status(200).json(proyecto);
        })
        .catch( err => {
            res.status(500).json(err);
        });
    }catch(err){
        res.status(500).json('Se ha producido un error en el servidor');
    }
    
}

const obtenerProyectos = async (req=request, res=response) => {
    
    const { desde,limite} = req.query;

    try{
        await model_proyectos.find().skip(desde).limit(limite)
        .then( proyectos => {
            res.status(200).json(proyectos);
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

const crearProyecto = async (req=request, res=response) => {
    
    const miniatura = req.body;
    
    try{
        const proyecto = new model_proyectos(miniatura);
        
        proyecto.save( (err,result) => {
            if(err){
                res.status(500).json(err);
            }

            if(result){
                res.status(200).json({
                    msg:"Se ha guardado un nuevo Proyecto",
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

const actualizarProyecto = async (req, res=response) => {
    
    const id = req.params.id;
    const query = req.body;

    try{
        await model_proyectos.findByIdAndUpdate( {_id:id}, query)
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
        })
    }
       
}

const eliminarProyecto = async (req, res=response) => {
    
   const id = req.params.id;
   
   try{
        await model_proyectos.findOneAndDelete( {_id:id})
        .then( result => {
            if(!result) res.status(200).json({
                msg:`No se ha encontrado la nota con id ${id}`
            });
            if(result) res.status(200).json(result);
        })
        .catch(
            err => res.status(500).json(err)
        );
   }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        })
   }
  
}

const eliminarAllProyectos = async (req=require,res=response) => {

    await model_proyectos.deleteMany({})
    .then( result => {
        res.status(200).json({
            msg:"Se han eliminado todos los proyectos"
        });
    })
    .catch(err => {
        res.status(500).json({
            msg:"No se ha podido eliminar todos los proyectos",
            err:err
        });
    });
};

module.exports = {
    obtenerProyecto,
    obtenerProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto,
    eliminarAllProyectos
}