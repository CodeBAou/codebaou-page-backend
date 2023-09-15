const {Router} = require('express');
const router  = Router();
const {login} = require('../controllers/auth');

router.post('/', login); //Crear post

module.exports = router ;