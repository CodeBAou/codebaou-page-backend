const {Router} = require('express');
const router  = Router();
const { estadistica, totalPost } = require('../controllers/estadistica');

router.get('/', estadistica); //Crear post
router.post('/',totalPost );


module.exports = router ;