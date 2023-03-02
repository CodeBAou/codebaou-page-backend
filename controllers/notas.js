const {response,request} = require('express');
const {model_notas} = require('../models');

const obtenerNota = async(req=request, res=response) => {

    const id = req.params.id;

    await model_notas.findById( req.params.id )
    .then( nota => {
        res.status(200).json(nota);
    }).catch( err => {
        res.status(500).json(err);
    });
}

const obtenerNotas = async ( req=request, res=response ) => {

    const {desde,limite} = req.query;

    await model_notas.find().skip(desde).limit(limite)
    .then( notas => {
        
        if(!notas) res.status(200).json( {msg:`No se encontro ningun resultado`});
        
        if(notas) res.status(200).json(notas);

    }).catch( err => {
        res.status(500).json({
            msg:"Error al realizar la consulta en la base de datos",
            err
        });
    });

};

const CrearNota = async (req=request, res=response) => {

    const nota = new model_notas(req.body);
   
    await nota.save( (err,result) => {

        if(err) res.status(500).json({
            msg:"Error al guardar una nueva nota",
            err
        });

        res.status(200).json({
            msg:"Se ha guardado una nueva nota",
            result
        });
    });
}

const actualizarNota = async (req=request, res=response) => {
    
    const id = req.params.id;
    const query = req.body;

    await model_notas.findByIdAndUpdate( {_id:id}, query)
    .then( 
        result => res.status(200).json(result) 
    )
    .catch(
        err => res.status(500).json(err)
    );
}

const eliminaNota = async (req=request, res=response) => {
    
    const id = req.params.id;
    
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
}

module.exports = {
    obtenerNota,
    obtenerNotas,
    CrearNota,
    actualizarNota,
    eliminaNota
}

