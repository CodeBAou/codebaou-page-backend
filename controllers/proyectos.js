const {response} = require('express');

const obtenerProyecto = (req, res=response) => {
    
    res.json({
        msg:'controllers proyectos Get'
    })
}

const guardarProyecto = (req, res=response) => {
    
    const body = req.body;

    res.json({
        msg:'controllers proyectos Post'
    })
}

const actualizarProyecto = (req, res=response) => {
    
    const body = req.body;

    res.json({
        msg:'controllers proyectos Put'
    })
}

const eliminarProyecto = (req, res=response) => {
    
    const body = req.body;
    
    res.json({
        msg:'controllers proyectos Delete'
    })
}

module.exports = {
    obtenerProyecto,
    guardarProyecto,
    actualizarProyecto,
    eliminarProyecto
}