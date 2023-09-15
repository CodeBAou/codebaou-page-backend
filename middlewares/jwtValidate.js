var jwt = require('jsonwebtoken');
const {response,request} =require('express');
const {model_users} = require('../models');

const validaJwt = async (req=request, res=response, next) => {
    console.log("validajwt   validacion token")
    
    let token = req.headers.authorization;
    console.log(token);
    


        // invalid token - synchronous
        try {
            
            var decoded = jwt.verify( token, process.env.SECRET_JWT); 

            res.status(200).json({
                msg:`Bienvenido ${decoded.data.name}`,
                user:decoded.data
            });

        } catch(err) {
            // err
            res.status(500).json({
                msg :"No tiene permiso para acceder ,inicie sesion y vuelva a intentarlos"
            })
        }

    res.status(200).json({
        msg:"No tiene permiso para realizar esta accion"
    })
}

module.exports = {
    validaJwt
}