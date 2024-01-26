const {response,request}          = require('express');
const {model_post, model_section} = require('../models');
const {isValidObjectId}           = require('../FuncionesAuxiliares/fnaux');

/**Guarda los datos del post y sus secciones
 * 
*  Utiliza dos collections
*      - Collection posts : almacena propiedades del post 
*      - Collection sections : almacena las secciones  ( Model.insertMany() )
*
*   Ejemplo data que se envia en el body
            * {
                "post": {
                    "titulo":"",
                    "descripcion":"",
                    "data":"",
                    "miniatura":"",
                    "enlace":"",
                    "tags":"<string> , <string>, <string>, ... ",
                    "destacados": boolean
                },
                "sections": [
                    {
                        "post":"",
                        "parrafo":"",
                        "img":"",
                        "order":1,
                        "type":1
                    },
                    {
                        "post":"",
                        "parrafo":"",
                        "img":"",
                        "order":2,
                        "type":2
                    }
                ]
            }
* 
*/

const crearPost = async (req = request, res = response) => {
    const post = req.body.post;
    const sections = req.body.sections;
    console.log(post);
  
    try {
      // Se almacena el post
      const result_post = await new model_post(post).save();
  
      // Se actualiza el post con los campos adicionales
      result_post.data = new Date();
      result_post.destacado = false;
      result_post.orderDestaco = false;
  
      // Se almacenan las secciones
      const sections_aux = sections.map((section) => ({
        ...section,
        post: result_post._id,
      }));
  
      const result_section = await model_section.insertMany(sections_aux);
  
      res.status(200).json({
        msg: "Se ha guardado el post correctamente",
        post: result_post,
        sections: result_section,
      });
    } catch (error) {
      console.log(error);
  
      if (error.name === "ValidationError") {
        // Manejar errores de validación de Mongoose
        res.status(400).json({
          msg: "Error de validación al intentar guardar el post",
          err: error.errors,
        });
      } else {
        // Otros errores
        res.status(500).json({
          msg: "Se ha producido un error en el servidor al crear un nuevo post",
          err: error,
        });
      }
    }
  };
  
/**
 * Crea una nueva seccion para un post
 * determina el post al que pertenece con la propiedad post '{post:<id>}' del json
 */
const crearSeccion = async( req=request, res=response) => {

    if( isValidObjectId(req.body.post) == false) {
        res.status(500).json({"msg":"El objecto id no es ObjectId de mongo"})
    }else{

        const nuevaSeccion = new model_section(req.body);

        nuevaSeccion.save( (err, result) => {
            if(err) {
                res.status(500).json({
                    msg:"Error al intentar guardar la nueva seccion"
                });
                console.log(err);
            }

            if(result){
                res.status(200).json({
                    msg:"Se ha guardado la nueva seccion"
                })
            }      
        });  
    }
}

/** Obtiene un post por id */
const obtenerPost = async(req=request, res=response) => {
    
    const id = req.params.id;
    
    try{
        
        await model_post.find({_id:`${id}`})
        .then( post => {
            res.status(200).json(post);
        })
        .catch( err => {
            res.status(500).json(err);
        });

    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });
    }
   
}

/**Obtiene todos los posts */
const obtenerPosts = async(req=request, res=response) => {

    const {desde,limite} = req.query;
    
    try{
        await model_post.find().skip(desde).limit(limite)
        .then( posts => {
            if(!posts) res.status(200).json( {msg:'No se encontro ningun post'});
            if(posts) res.status(200).json({
                data:posts
            });
        })
        .catch( err => {
            res.status(500).json({
                msg:"Error al realizar la consulta en la base de datos",
                err
            });
        });

    }catch(err){
        res.status(500).json({
            msg:'Se ha producido un error en el servidor',
            err:err
        });

        console.log(err);
    }
  
}

/**
 * El body de la peticion viene con 2 propiedades
 * post:{} _id se envia por parametro y aqui van las propiedades que se modifican en el post 
 * section:[{},{}, ... ]  : si existe alguna section se modifica las propiedades segun la propiedad _id que se envirar en section : [{_id:"", propiedades para actualizar}]
 */
const actualizarPost = async (req=request, res=response ) => {

    const id    = req.params.id;
    const query = req.body;

    await model_post.findByIdAndUpdate( {_id:id}, query)
    .then( (result) => {
        res.status(200).json({
            msg:"Se ha actualizado el post correctamente",
            post:result
        });
    })
    .catch( (err) => res.status(500).json({
        msg:`Error al actualizar el post con el id ${id}`
    }));
        
}

/** Actualiza una seccion por id */
const actualizarSection = async ( req=request, res=response) => {
    
    const id    = req.params.id;
    const query = req.body;

    await model_section.findByIdAndUpdate( {_id:id} , query)
    .then( (result) => {
        res.status(200).json({
            msg:"Se ha modificado la seccion correctamente",
            section:result
        })
    })
    .catch( err => {
        res.status(400).json({
            msg:"No se ha podido actualizar la seccion"
        });
        console.log(err);
    });
} 

/**
 * Elimina el post y todos los document de sections que le pertenecen
 */
const eliminaPost = async (req=request, res=response) => {

    const id = req.params.id;

    await model_post.findByIdAndDelete( {_id:id} )
    .then( result => {

        model_section.deleteMany({post:id})
        .then( result =>{
            res.status(200).json({
                msg:"Se ha eliminado el post "
            })
        })
        .catch( (error) => {
            res.status(500).json({
                msg:"Se ha producido un error al intentar eliminar las section"
            });
            console.log(error);
        });
  
    })
    .catch( err => res.status(500).json(err));

}

//Obtienes secciones por el id del post al que pertenece
const getSections = async (req=request, res=response) => {

    const id = req.params.id;

    await model_section.find({post:id})
    .then(result => res.status(200).json(result))
    .catch( err => console.log(err));
}

const destacados = async (req=request, res=response) => {
    await model_post.find({destacado:true})
    .then(result => res.status(200).json(result))
    .catch( err => {
        console.log(err);
        res.status(300).json({err:err});
    });
}
 
const saveDestacados = async (req=request, res=response) => {

    const data = req.body;

   
    // Buscar todos los documentos y actualizar destacados = false
    try {

        const filtro        = { destacado: true };
        const actualizacion = {
        $set: { destacado: false }
        };
        
        const resultado = await model_post.updateMany(filtro, actualizacion);

            //Actualizar documentos indicados por el usuario y cambiar destacados = true
        const postUser1 = await model_post.updateMany(
            { _id : req.body[0]._id }, 
            { $set:{destacado : true, orderDestacado : 1} }
        );
        
         //Actualizar documentos indicados por el usuario y cambiar destacados = true
        const postUser2 = await model_post.updateMany(
            { _id : req.body[1]._id }, 
            { $set:{destacado : true, orderDestacado : 2} }
        );

        //Actualizar documentos indicados por el usuario y cambiar destacados = true
        const postUser3 = await model_post.updateMany(
            { _id : req.body[2]._id }, 
            { $set:{destacado : true, orderDestacado : 3} }
        );

        res.status(200).json({msg:"Se ha actualizado los posts destacados"});
       
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error en la consulta con la base de datos"
        });
    }
      
}
    

module.exports = {
    obtenerPost,
    obtenerPosts,
    crearPost,
    actualizarPost,
    eliminaPost,
    actualizarSection,
    crearSeccion,
    getSections,
    destacados,
    saveDestacados
}