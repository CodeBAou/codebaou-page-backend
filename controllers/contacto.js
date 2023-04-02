const nodemailer = require("nodemailer");

const {response, request} = require('express');

const contactoPost = async (req=request, res=response) => {

    const body = req.body.data;
    
   
    
    /* CONFIGURACION SMTP
    Para gmail:
        - activar verificacion en dos pasos
        - crear contraseña para aplicacion, dentro de google 
            cuenta > seguridad
    */
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          type:'login',
          user: 'borisafuy@gmail.com', // cuenta de gmail para envio
          pass: 'ahobzqzugpvcawyk', // contraseña de aplicacion creada desde la cuenta de google
        },
    });
     
    //DEFINIR DATA PARA EL ENVIO
     //DATA PARA EL ENVIO
    const data = {
        from: body.emisor, // sender address
        to: 'borisafuy@gmail.com', // list of receivers
        subject: "codebaoupage - NEW MENSAJE✔  /n" + body.emisor, // Subject line
        text: body.mensaje, // plain "Hello world?"
    };

    try{
        //Envio
        await transporter.sendMail(data, (err,info) =>{
            if(err) res.status(500).json({
                msg:"No se ha podido enviar el email",
                err
            });

            if(info) res.status(200).json({
                msg:"Se ha enviado el email!",
                info
            });
        });

    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
    
}

module.exports={
    contactoPost
}

