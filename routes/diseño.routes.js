const {Router}     = require('express');
const router       = Router();
const { ObtenerDiseño, ObtenerDiseños, CrearDiseño, actualizarDiseño, eliminaDiseño, eliminarAllDiseños} = require('../controllers/diseños');

//Aqui se guarda una coleccion de rutas para el apartado diseños
router.get('/', ObtenerDiseños);
router.get('/diseno/:id', ObtenerDiseño);
router.post('/', CrearDiseño);
router.put('/:id', actualizarDiseño);
router.delete('/:id', eliminaDiseño);
router.delete('/',eliminarAllDiseños);  //Tarea meter middleware

module.exports = router;