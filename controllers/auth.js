const {response,request} =require('express');
var jwt = require('jsonwebtoken');
const {model_users} = require('../models');

const login = async( req=request, res=response) => {

    const user  = req.body.user;
   
    try{

        const userdb = await model_users.findOne({email: user.email}).exec();
       
        if(userdb != null && user.email === userdb.email){

            //Se crea token jwt
            const token =  jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user
            },process.env.SECRET_JWT ,   ( err ,  jwt) =>  { 
                if  ( err )  { 
                    console.log(err)
                }   

                res.status(200).json({
                    msg:"Se ha encontrado el usuario 2",
                    role:1,
                    token:jwt
                });
                
            } );
    
        }
        else{
            res.status(200).json({
                msg:"No se ha encontrado el usuario",
                token:null
            });
        }
    
    }catch(err){
        res.status(400).json({msg:"user.email undefined"});
    }
}

module.exports = {login};