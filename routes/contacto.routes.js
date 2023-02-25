const {Router}      = require('express');
const router        = Router();
const {contactoGet, contactoPost, contactoPut, contactoDelete} = require('../controllers/contacto');

//Aqui se guardar una coleccion de rutas para el apartado contacto
router.post('/', contactoPost);

module.exports = router;