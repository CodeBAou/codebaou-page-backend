const express      = require('express');   //paquete express - npm , servidor web en node
const cors         = require('cors');   //paquete cors - npm , configuracion rapida de cabeceras http
const {Conexiondb} = require('../database/config');


class Server{

    constructor(){
        //Se Inicia la instancia de express
        this.app = express();

        //Mongo
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas 
        this.routes();
    }

    //Conecta el Servidor a la base de datos
    async conectarDB(){
        Conexiondb();
    }

    //Rutas de nuestra Api, llamamos al objecto router y no a un middleware
    routes(){
        //Se confugura la rutas que se deben utilizar en nuestra api
        this.app.use( '/api/contacto', require( '../routes/contacto.routes' ) ); //Apartado Contacto
        this.app.use('/api/notas', require('../routes/notas.routes'));  //Apartado Notas
        this.app.use('/api/disenos',require('../routes/diseño.routes')); // Apartado disenos
        this.app.use('/api/proyectos',require('../routes/proyectos.routes')); //Apartado proyectos
    }  

    //Middlewares , se configura el servidor
    middlewares(){
        //cabezeras http
        this.app.use(cors());
        //for parsing application/json
        this.app.use(express.json());
    
        //for parsing application/x-www-form-urlencoded
       // app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
        //Servir pagina statica en carpeta public (valido para React,Angular)
        //this.app.use( express.static('public') );
    }

    //Este Método pone el servidor en escucha
    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log("Servidor corriendo en el puerto:",process.env.PORT);
        });
    }
}

module.exports = Server;