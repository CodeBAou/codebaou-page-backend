const {Router} = require('express');
const router = Router();
const {obtenerNota,obtenerNotas, CrearNota, actualizarNota, eliminaNota, eliminarAllNotas} = require('../controllers/notas');

//Aqui se guarda una coleccion de rutas para el apartado notas
router.get('/:id', obtenerNota);

router.get('/', obtenerNotas);

router.post('/', CrearNota);

router.put('/:id', actualizarNota);

router.delete('/:id', eliminaNota);

router.delete('/',eliminarAllNotas);  //Tarea meter middleware - dev

module.exports = router;