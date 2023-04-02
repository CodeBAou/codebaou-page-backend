const {response,request} = require('express');
const { Types } = require('mongoose');
const {model_section} = require('../models');

const obtenerSection = async(req=request, res=response) => {

    const id = req.params.id;

    try{
        await model_section.find({post:id})
        .then( section => {

            if(!section) res.status(200).json( {msg:'No se encontro ninguna section'} );
            if(section) res.status(200).json(section);

        }).catch( err =>{
            res.status(500).json({
                msg:'Error al realizar la consulta en la base de datos',
                err
            });
        });
    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor'
        });
    }
    
}

const obtenerSections = async(req=request, res=response ) => {
    
    const {desde,limite} = req.query;

    try{
        await model_section.find().skip(desde).limit(limite)
        .then( section => {
            res.status(200).json(section);
        })
        .catch ( err => {
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

const crearSection = async (req=request, res=response) => {
    
    
    const section = new model_section(req.body);
    const objectId = Types.ObjectId(section.post);
    section.post = objectId;
    
    console.log("sections:");
    console.log(section);
    
    try{

            await section.save( (err,result) => {
    
                if(err){
                    res.status(500).json(
                        {
                        msg:'Error al guardar la section',
                        err
                        }
                    )
                }
                
                if(result){
                    
                    res.status(200).json({
                        msg:"Se ha guardado una nueva section",
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

const actualizarSection = async (req=request, res=response) => {

    const id = req.params.id;
    const query = req.body;

    try{
        await model_section.findByIdAndUpdate( {_id:id}, query)
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

const eliminaSection = async (req=request, res=response) => {

    const id = req.params.id;

    try{
        await model_section.findByIdAndDelete( {_id:id} )
        .then( result => {
            if(!result) res.status(200).json({
                msg:`No se ha encontrado ninguna section con el id ${id}`
            });

            if(result) res.status(200).json({
                result
            })
        })
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

//ELiminar todas las sections de la base de datos
const eliminarAllsection = async (req=reques, res=response) => {
    try{
        await model_section.deleteMany({})
        .then(result=>{
            res.status(200).json({msg:"Se elimianron todas las sections"})
        }).catch(err => {
            res.status(500).json(
                {msg:"No se ha podido eliminar las sections",
                err:err
            });

        })
        
    }catch(err){
        res.status(500).json({
           err:err,
           msg:"Error al eliminar todos los usuarios"
        })
    }
}

module.exports = {
    obtenerSection,
    obtenerSections,
    crearSection,
    actualizarSection,
    eliminaSection,
    eliminarAllsection
}