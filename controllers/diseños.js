const {response, request} = require('express');
const {model_diseños}     = require('../models');

const ObtenerDiseño =  async (req=request, res=response) =>{

    const id = req.params.id;

    try{
        await model_diseños.findById( req.params.id ).then( diseño => {
            res.status(200).json(diseño);
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

const ObtenerDiseños = async (req=request, res=response) => {
    
    const {desde,limite} = req.query;
   try{
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
   }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
   }
    
    
}

const CrearDiseño = async ( req=request, res=response ) => {
    
    const miniatura = req.body;
    console.log(req.body);
    try{
        const diseno = await model_diseños(miniatura);
        diseno.save( (err,result) => {
            

            if(err){
                res.status(500).json(err);
            }

            if(result){
                res.status(200).json(result);
            }
            
        });
    }catch(err){
        res.status(500).json(err);
    }
 
   
}

const actualizarDiseño = async(req=request, res=response) => {
    
    const id    = req.params.id;
    const query = req.body;
    
    try{
        await model_diseños.findByIdAndUpdate({_id:id},query,{new:true})
        .then( result => {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json(err)
        });
    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
   
}

const eliminaDiseño = async (req, res=response) => {

    const body = req.body;
    const id   = req.params.id;

    try{
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
    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
   
   
}

const eliminarAllDiseños = async (req=require,res=response) => {
    await model_diseños.deleteMany({})
    .then(result=>{
        res.status(200).json({msg:"Se eliminaron todos los diseños"});
    })
    .catch(err=>{
        res.status(500).json({
            msg:"No se ha podido eliminar todos los diseños",
            err:err
        })
    });
}
module.exports={
    ObtenerDiseño,
    ObtenerDiseños,
    CrearDiseño, 
    actualizarDiseño, 
    eliminaDiseño,
    eliminarAllDiseños
}

