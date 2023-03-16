const {Router}      = require('express');
const router        = Router();
const {contactoPost} = require('../controllers/contacto');

//Aqui se guardar una coleccion de rutas para el apartado contacto
router.post('/', contactoPost);

module.exports = router;