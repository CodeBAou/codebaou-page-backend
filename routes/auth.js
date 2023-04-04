const {Router}       = require('express');
const router         = Router();
const {Identity} = require('../middlewares/Identity/jwt');

//Se envia usuario y contraseña si es correcto se devuelve el token de autorizacion
router.post('/', Identity);
//Obtener configuracion del servidor 

module.exports = router;