const {Router} = require('express');
const router = Router();
const {obtenerNotas, guardarNota, actualizarNota, eliminarNota} = require('../controllers/notas');

//Aqui se guarda una coleccion de rutas para el apartado notas
router.get('/', obtenerNotas);

router.post('/', guardarNota);

router.put('/', actualizarNota);

router.delete('/', eliminarNota);

module.exports = router;