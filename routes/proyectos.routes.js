const {Router} = require('express');
const router   = Router();
const {obtenerProyecto, obtenerProyectos, crearProyecto, actualizarProyecto, eliminarProyecto} = require('../controllers/proyectos');

//Aqui se guarda una coleccion de rutas para el apartado proyectos
router.get('/:id', obtenerProyecto);

router.get('/', obtenerProyectos);

router.post('/', crearProyecto);

router.put('/:id', actualizarProyecto);

router.delete('/:id', eliminarProyecto);

module.exports = router;