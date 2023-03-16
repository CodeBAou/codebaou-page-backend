const {Router}       = require('express');
const router         = Router();
const {Identity} = require('../middlewares/Identity/jwt');

//Aqui se guardar una coleccion de rutas para el apartado contacto
router.post('/', Identity);

module.exports = router;