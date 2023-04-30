const express         = require('express');   //paquete express - npm , servidor web en node
const cors            = require('cors');   //paquete cors - npm , configuracion rapida de cabeceras http
const {Conexiondb}    = require('../database/config');
const { GoogleIdentity, verificaPermiso } = require('../middlewares/Identity/jwt');

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
        this.app.use('/api/contacto',cors() ,require( '../routes/contacto.routes' ) ); //Apartado Contacto
        this.app.use('/api/notas',cors(), require('../routes/notas.routes'));  //Apartado Notas
        this.app.use('/api/disenos', cors(), require('../routes/diseño.routes'));//Apartado Deseños
        this.app.use('/api/proyectos', cors(),require('../routes/proyectos.routes')); //Apartado proyectos
        //this.app.use('/private', require('../routes/private.routes'));
        this.app.use('/auth', cors(), require('../routes/auth'));
        this.app.use('/private/post', cors(),require('../routes/post.routes'));
        this.app.use('/private/section', cors(),require('../routes/section.routes'));
    }  

    //Middlewares , se configura el servidor
    middlewares(){
        //cabezeras http
        this.app.use(cors());
      
        //Control de errores
        this.app.use(function(err, req, res, next) {

            console.error(err.stack," ::middleware::");

            res.status(500).send({
                err:err,
                msg:"Se ha producido un error en el servidor, compruebe que los datos se han enviado correctamente"
            });
        });

        //for parsing application/x-www-form-urlencoded
        //app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

        //Pasar el body a Json
        this.app.use(express.json());
        
        //Acceder al apartado publico (No es necesario tener auth)    - Servir pagina Estática
        this.app.use('/',express.static('public'));
        //Aceder al apartado privado (se necesita tener el token jwt para que funcione)     - Sevir Pagina Estática
      
    }

    //Este Método pone el servidor en escucha
    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log("Servidor corriendo en el puerto:", process.env.PORT);
        });
    }
}

module.exports = Server;