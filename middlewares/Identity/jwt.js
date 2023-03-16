const {request, response, next} = require('express');
const {model_auth}              = require('../../models');
const Crypto                    = require("crypto-js");
const  JWT                      = require('jsonwebtoken');

// #Crear autentificacion mediante la api de google- TAREA PENDIENTE

//Inicio de sesion - Obtener token
const Identity = async (req=request,res=response,next) => {

    const identity     = false;
    const {user, pass} = req.body;
    const userdb       = await model_auth.find( {user:user} );

    if(!userdb) res.status(200).json( {msg:"El usuario no existe"} );


    if( Crypto.MD5(pass) == userdb[0].pass){
       
       //Se crea el token jwt
        let jwtstatus = await JWT.sign({ user:user, pass:pass }, process.env.PRIVATEKEYJWT, {
            algorithm: "HS256",
            expiresIn: "1h",
        });
        
        console.log(jwtstatus);

        if(!jwtstatus) res.status(403).json({
            err:'No se ha podido crear el token por un problema interno',
            token:jwtstatus
        });

        res.json({
            token:jwtstatus
        })
    }else{
        res.status(200).json({
            err: 'La contraseña no es correcta'
        })
    }
}

//Crea el token JWT - private
let getTokenJWT = async (res,user,pass) => {
    return ;
}

//Verifica el token por expiracion
let VerificaJWT = async (token) => {
    
    console.log('middleware');

    try{
        const decode = JWT.verify(token, process.env.PRIVATEKEYJWT);
        console.log('token',token);
        console.log('verifica:', decode);
        next();
    }catch(err){
        console.log('err');
        return {
            estado:false,
            err:err
        };
    }
   
}

//guardado para pruebas
const fnAuxiliar = async (res,data) => {

    const {user,pass} = data;
    const model       = new model_auth({
        user:user,
        pass:Crypto.MD5(pass)
    });

    await model.save().then( guardado => {

        if(!guardado) res.json( { msg:"no se ha guardado el usuario"}  );
        res.json( guardado );

    }).catch( err => {
        res.json(err);
    });
}



module.exports = {
    Identity,
    VerificaJWT
}