const {Router} = require('express');
const router = Router();
const {destacados, saveDestacados} = require('../controllers/post');
const { validaJwt } = require('../middlewares/jwtValidate');
router.post('/',validaJwt,saveDestacados);
router.get('/',validaJwt,destacados);
module.exports = router;