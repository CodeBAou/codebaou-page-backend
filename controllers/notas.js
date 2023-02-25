const {response} = require('express');

const obtenerNotas = ( req, res=response ) => {

    res.json({
        msg:"controllers notas Get"
    });
};

const guardarNota = (req, res=response) => {

    const body = req.body;

    res.json({
        msg:"controllers notas Post"
    });
}

const actualizarNota = (req, res=response) => {
    
    const body = req.body;

    res.json({
        msg:"controller notas Put"
    });
}

const eliminarNota = (req, res=response) => {
    
    const body = req.body;

    res.json({
        msg:"controller notas Delete"
    });
}

module.exports = {
    obtenerNotas,
    guardarNota,
    actualizarNota,
    eliminarNota
}

