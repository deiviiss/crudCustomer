const express = require('express');
const router = express.Router();

//módulo auth.js
const { isLoggedIn } = require('../lib/auth.js');

//controller customer
const controller = require('../controllers/customer.controller.js')

//* Agregar cliente
//envia el formulario
router.get('/add-customer', isLoggedIn, controller.getAdd);

//recibe el formulario
router.post('/add-customer', isLoggedIn, controller.postAdd);

//* Edita cliente
//envia formulario para editar
router.get('/edit-customer/:id', isLoggedIn, controller.getEdit);

//recibe formulario editado
router.post('/edit-customer/:id', isLoggedIn, controller.postEdit);

//*baja clientes
//envia formulario baja
router.get('/baja-customer/:id', isLoggedIn, controller.getTramite);

//recibe formulario baja
router.post('/baja-customer/:id', isLoggedIn, controller.postTramite);

//*lista todos los clientes
router.get('/list-customer', isLoggedIn, controller.getList);

//*lista clientes por status
router.get('/:status', isLoggedIn, controller.getstatus);

//* Agregar observaciones

//* Finalizar

module.exports = router;