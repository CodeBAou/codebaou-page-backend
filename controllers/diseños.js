const {response, request} = require('express');
const {model_diseños}     = require('../models');

const ObtenerDiseño =  async (req=request, res=response) =>{

    const id = req.params.id;

    await model_diseños.findById( req.params.id ).then( diseño => {
        res.status(200).json(diseño);
    }).catch( err => {
        res.status(500).json(err);
    });        
       
}

const ObtenerDiseños = async (req=request, res=response) => {
    
    const {desde,limite} = req.query;
   
    await model_diseños.find().skip(desde).limit(limite)
    .then( diseños => {
            res.status(200).json({
                diseños
            });
    })
    .catch( err => {
            res.status(500).json({
                msg:"Error al realizar la consulta en la base de datos",
                err
            });
    });
    
}

const CrearDiseño = async ( req=request, res=response ) => {
    
    const diseño = new model_diseños(req.body);

    await diseño.save( (err,result) => {
        
        if(err) res.status(500).json({
            msg:"Error al guardar un nuevo diseño",
            err
        });

        res.status(200).json({
            msg:"Se ha guardado un nuevo diseño",
            result
        });
    });
}

const actualizarDiseño = async(req=request, res=response) => {
    
    const id    = req.params.id;
    const query = req.body;
    console.log(id);
    console.log(req.body);
    
    await model_diseños.findByIdAndUpdate({_id:id},query,{new:true})
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        res.status(500).json(err)
    })

}

const eliminaDiseño = async (req, res=response) => {

    const body = req.body;
    const id   = req.params.id;

    await model_diseños.findOneAndRemove( {_id:id} )
    .then( diseño => {
        
        if(!diseño) res.status(200).json({
            msg:`No existe un diseño con id ${id}`
        })

        if(diseño){
            res.status(200).json({
                msg:`Se ha eliminado el diseño con el id ${id}`
            });
        }
        

    }).catch( err => {
        res.status(500).json({
            msg:"Error al intentar eliminar el diseño de la base  de datos",
            err
        });
    });
   
}

module.exports={
    ObtenerDiseño,
    ObtenerDiseños,
    CrearDiseño, 
    actualizarDiseño, 
    eliminaDiseño 
}

