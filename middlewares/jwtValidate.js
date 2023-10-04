var jwt = require('jsonwebtoken');
const {response,request} =require('express');
const {model_users} = require('../models');

const validaJwt = async (req=request, res=response, next) => {
   
    
    let token = req.headers.authorization;

        // invalid token - synchronous
        try {
            
            var decoded = jwt.verify( token, process.env.SECRET_JWT); 
            next();
            
        } catch(err) {
            // err
            res.status(500).json({
                msg :"No tiene permiso para acceder ,inicie sesion y vuelva a intentarlos"
            })
        }

  
}

module.exports = {
    validaJwt
}