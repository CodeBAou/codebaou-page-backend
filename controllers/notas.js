const {response,request} = require('express');
const {model_notas} = require('../models');

const obtenerNota = async(req=request, res=response) => {

    const id = req.params.id;
    try{
        await model_notas.findById( id )
        .then( nota => {
            res.status(200).json(nota);
        }).catch( err => {
            res.status(500).json(err);
        });
    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
    
}

const obtenerNotas = async ( req=request, res=response ) => {

    try{
        await model_notas.find({}).skip(req.query.desde).limit(req.params.limite) //skip -> empieza en 0
        .then( notas => {
          
            if(!notas) res.status(200).json( {msg:`No se encontro ningun resultado`});
            
            if(notas) res.status(200).json(notas);
    
        }).catch( err => {
            res.status(500).json({
                msg:"Error al realizar la consulta en la base de datos",
                err
            });
        });
    }
    catch(err){
        res.status(500).json({
            err:err,
            msg:'Se ha producido un error en el sevidor'
        });
    };
   

};

const CrearNota = async (req=request, res=response) => {

    const miniatura = req.body;
   
  
    const nota = new model_notas(miniatura);
   
    try{
        await nota.save( (err,result) => {

            if(err) res.status(500).json({
                msg:"Error al guardar una nueva nota",
                err
            });
    
            if(result){
                res.status(200).json({
                    msg:"Se ha guardado una nueva nota",
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
  
};

const actualizarNota = async (req=request, res=response) => {
    
    const id = req.params.id;
    const query = req.body;

    try{
        await model_notas.findByIdAndUpdate( {_id:id}, query)
        .then( 
            result => res.status(200).json(result) 
        )
        .catch( err => res.status(500).json(err) );

    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    };
   
};

const eliminaNota = async (req=request, res=response) => {
    
    const id = req.params.id;
    
    try{
        await model_notas.findOneAndDelete( {_id:id})
        .then( result => { 
    
            if(!result) res.status(200).json({
                msg:`No se ha encontrado la nota con el id ${id}`
            });
            
            if(result) res.status(200).json(result);
    
        } )
        .catch( 
            err => res.status(500).json(err) 
        );

    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
   
};

const eliminarAllNotas = async (req=require, res=response) => {
    await model_notas.deleteMany({})
        .then(result => {
            res.status(200).json({
                msg:"Se eliminaron todos los notas"
            });
        })
        .catch(err => {
            res.status(500).json({
                msg:"No se ha podido eliminar todos las notas",
                err:err
            });
        })
};


module.exports = {
    obtenerNota,
    obtenerNotas,
    CrearNota,
    actualizarNota,
    eliminaNota,
    eliminarAllNotas
}

