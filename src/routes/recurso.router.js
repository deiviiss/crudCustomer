//directorio afores

//dependends
const express = require('express');
const router = express.Router();

//moódulo auth
const { isLoggedIn } = require('../lib/auth');

//controlador afores
const controller = require('../controllers/recurso.controller');


//lista afores
router.get('/afores', isLoggedIn, controller.getAfores);

//cotizar
router.get('/calculate', isLoggedIn, controller.getCalculate);

router.post('/calculate', isLoggedIn, controller.postCalculate);


module.exports = router;
