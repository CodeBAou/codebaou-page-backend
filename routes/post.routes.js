const {Router} = require('express');
const router = Router();
const {obtenerPost, obtenerPosts, crearPost, actualizarPost, eliminaPost, eliminarALLpost, actualizarSection, crearSeccion} = require('../controllers/post');

router.get('/:id',obtenerPost); //Obtener Posts
router.get('/', obtenerPosts); //Obtener post
router.post('/', crearPost); //Crear post
router.post('/section', crearSeccion); //Crear section
router.put('/:id', actualizarPost); //Actualizar Post
router.put('/section/:id', actualizarSection); //Actualizar Post
router.delete('/:id', eliminaPost); //Eliminar Post
router.delete('/', eliminarALLpost);
module.exports = router;