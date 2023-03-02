const {request,response} = require('express');
const {model_proyectos} = require('../models');

const obtenerProyecto = async (req, res=response) => {
    
    const id = req.params.id;

    await model_proyectos.findById( req.params.id )
    .then( proyecto => {
        res.status(200).json(proyecto);
    })
    .catch( err => {
        res.status(500).json(err);
    });
}

const obtenerProyectos = async (req=request, res=response) => {
    
    const { desde,limite} = req.query;

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
}

const crearProyecto = async (req=request, res=response) => {
    
    const proyecto = new model_proyectos(req.body);

    await proyecto.save( (err,result) => {

        if(err) res.status(500).json({
            msg:"Error al guardar un nuevo proyecto"
        });

       res.status(200).json({
        msg:"Se ha guardado una nueva nota",
        result
       });

    });
}

const actualizarProyecto = async (req, res=response) => {
    
    const id = req.params.id;
    const query = req.body;

    await model_proyectos.findByIdAndUpdate( {_id:id}, query)
    .then( 
        result => res.status(200).json(result)
    )
    .catch(
        err => res.status(500).json(err)
    );

    
}

const eliminarProyecto = async (req, res=response) => {
    
   const id = req.params.id;
   
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
}

module.exports = {
    obtenerProyecto,
    obtenerProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
}