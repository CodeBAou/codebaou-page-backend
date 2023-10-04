const {Router} = require('express');
const router = Router();
const {obtenerPost, obtenerPosts, crearPost, actualizarPost, eliminaPost, actualizarSection, crearSeccion, getSections } = require('../controllers/post');
const {validaJwt} = require('../middlewares/jwtValidate');

router.get('/:id',obtenerPost); //Obtener Posts
router.get('/', obtenerPosts); //Obtener post
router.get('/sections/:id',getSections )
router.post('/',validaJwt,crearPost); //Crear post
router.post('/section',validaJwt,crearSeccion); //Crear section
router.put('/:id',validaJwt,actualizarPost); //Actualizar Post
router.put('/section/:id', validaJwt,actualizarSection); //Actualizar Post
router.delete('/:id',validaJwt,eliminaPost); //Eliminar Post


module.exports = router;