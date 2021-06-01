//rutas para registro, login, logout
//depends
const express = require('express');
const router = express.Router();

//módulo auth.js
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth.js');

//controllers authentic
const controller = require('../controllers/authentic.controller.js');

//?=============== restore password
//envía formulario restaurar
router.get('/restore-password/:id', isLoggedIn, controller.getRestorePassword);

//reibe formulario restaurar
router.post('/restore-password/:id', isLoggedIn, controller.postRestorePassword);

//?=============== registro usuario
//envia formulario
router.get('/register-user', isLoggedIn, controller.getRegister);

//recibe formulario
router.post('/register-user', isLoggedIn, controller.postRegister);

//?=============== login usuario
//envia formulario
router.get('/login', isNotLoggedIn, controller.getLogin)

//recibe formulario
router.post('/login', isNotLoggedIn, controller.postLogin);

//?=============== dashboard
//envia a perfil
router.get('/dashboard', isLoggedIn, controller.dashboard);

//cierra sesión
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;