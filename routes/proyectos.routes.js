const {Router} = require('express');
const router   = Router();
const {obtenerProyecto, guardarProyecto, actualizarProyecto, eliminarProyecto} = require('../controllers/proyectos');

//Aqui se guarda una coleccion de rutas para el apartado proyectos
router.get('/', obtenerProyecto);

router.post('/', guardarProyecto);

router.put('/', actualizarProyecto);

router.delete('/', eliminarProyecto);

module.exports = router;