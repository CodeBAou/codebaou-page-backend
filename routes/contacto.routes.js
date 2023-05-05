const {Router}      = require('express');
const router        = Router();
const {contactoPost,CV} = require('../controllers/contacto');

//Aqui se guardar una coleccion de rutas para el apartado contacto
router.post('/', contactoPost);
router.post('/cv',CV);
module.exports = router;