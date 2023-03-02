const {Router} = require('express');
const router = Router();
const {obtenerNota,obtenerNotas, CrearNota, actualizarNota, eliminaNota} = require('../controllers/notas');

//Aqui se guarda una coleccion de rutas para el apartado notas
router.get('/:id', obtenerNota);

router.get('/', obtenerNotas);

router.post('/', CrearNota);

router.put('/:id', actualizarNota);

router.delete('/:id', eliminaNota);

module.exports = router;