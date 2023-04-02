const {Router} = require('express');
const router = Router();
const {obtenerPost, obtenerPosts, crearPost, actualizarPost, eliminaPost, eliminarALLpost} = require('../controllers/post');

router.get('/:id',obtenerPost); //Obtener Posts
router.get('/', obtenerPosts); //Obtener post
router.post('/', crearPost); //Crear post
router.put('/:id', actualizarPost); //Actualizar Post
router.delete('/:id', eliminaPost); //Eliminar Post
router.delete('/', eliminarALLpost);
module.exports = router;