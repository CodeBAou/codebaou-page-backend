const nodemailer = require("nodemailer");

const {response, request} = require('express');

const contactoPost = async (req=request, res=response) => {

    const body = req.body;
    
    /* CONFIGURACION SMTP
    Para gmail:
        - activar verificacion en dos pasos
        - crear contraseña para aplicacion, dentro de google 
            cuenta > seguridad
    */
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          type:'login',
          user: process.env.emailnodemailer, // cuenta de gmail para envio
          pass: process.env.passAplicationGoogleNodemailer, // contraseña de aplicacion creada desde la cuenta de google
        },
    });
     
    //DEFINIR DATA PARA EL ENVIO
     //DATA PARA EL ENVIO
    const data = {
        from: `me <${process.env.emailnodemailer}>`, // sender address
        to: process.env.emailnodemailer, // list of receivers
        subject: "codebaoupage     -          NEW MENSAJE✔      de       " + body.emisor, // Subject line
        text: body.mensaje , // plain "Hello world?"
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


const CV = async (req=require, res = response) => {

    const body = req.body;
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          type:'login',
          user: process.env.emailnodemailer, // cuenta de gmail para envio
          pass: process.env.passAplicationGoogleNodemailer, // contraseña de aplicacion creada desde la cuenta de google
        },
    });
     
    //DEFINIR DATA PARA EL ENVIO
     //DATA PARA EL ENVIO
    const data = {
        from: `me <${process.env.emailnodemailer}>`, // sender address
        to: process.env.emailnodemailer, // list of receivers
        subject: "codebaoupage     -          NEW MENSAJE✔      de       " + body.emisor, // Subject line
        text: body.mensaje , // plain "Hello world?"
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
    contactoPost,
    CV
}

