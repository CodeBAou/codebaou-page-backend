const {response} = require('express');

const contactoPost = (req, res=response) => {

    const body = req.body;
    
    //Enviar correo Electronico

    res.json({
        msg:'controlador contacto Post',
        body
    });
}

module.exports={
    contactoPost
}

