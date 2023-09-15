const {response,request} =require('express');
var jwt = require('jsonwebtoken');
const {model_users} = require('../models');

const login = async( req=request, res=response) => {

    const user  = req.body.user;
    const userdb = await model_users.findOne({email:user.email}).exec();

    if(userdb){

        

        //Se crea token jwt
        const token =  jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user
          },process.env.SECRET_JWT ,   ( err ,  decodificado ) =>  { 
            if  ( err )  { 
              console.log(err)
            }
            } );
       

        res.status(200).json({
            msg:"Se ha encontrado el usuario ",
            role:1,
            token:token
        });
    }
    else{
        res.status(200).json({
            msg:"No se ha encontrado el usuario",
            token:null
        });
    }
   
}

module.exports = {login};