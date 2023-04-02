const {Router} = require('express');
const router = Router();
const {obtenerSection, obtenerSections, crearSection, actualizarSection, eliminaSection,eliminarAllsection} = require('../controllers/sections');
//importar Rutas de controller

router.get('/:id',obtenerSection);
router.get('/',obtenerSections);
router.post('/',crearSection);
router.put('/:id',actualizarSection);
router.delete('/:id',eliminaSection);
router.delete('/',eliminarAllsection);

module.exports = router;

