const {Router}       = require('express');
const router         = Router();
const {Identity,fnAuxiliar} = require('../middlewares/Identity/jwt');

//Se envia usuario y contraseña si es correcto se devuelve el token de autorizacion
router.post('/', Identity);
//router.post('/createUser',fnAuxiliar); create user
//Obtener configuracion del servidor 

module.exports = router;