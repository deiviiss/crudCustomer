//rutas para registro, login, logout
//depends
const express = require('express');
const router = express.Router();

//módulo auth.js
const { isLoggedIn } = require('../lib/auth.js');

//controllers authentic
const controller = require('../controllers/asesor.controller.js');

//?=============== registro asesor
//envia formulario
router.get('/register-asesor', isLoggedIn, controller.getAddAsesor);

//recibe formulario
router.post('/register-asesor', isLoggedIn, controller.postAddAsesor);

//?=============== lista asesores
// lista de asesores
router.get('/', isLoggedIn, controller.getAsesores);

//cambia status asesor
router.get('/status-asesor/:id', isLoggedIn, controller.getStatusAsesor);

//?=============== edita asesor
//envia formulario
router.get('/edit-asesor/:id', isLoggedIn, controller.getEditAsesor);

//recibe formulario
router.post('/edit-asesor/:id', isLoggedIn, controller.postEditAsesor);
module.exports = router;