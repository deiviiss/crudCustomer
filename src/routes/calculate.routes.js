const express = require('express');
const router = express.Router();

//módulo auth.js
const { isLoggedIn } = require('../lib/auth.js')

//controller calculate
const controller = require('../controllers/calculate.controller.js')

router.get('/calculate/', isLoggedIn, controller.getCalculate);

router.post('/calculate/', isLoggedIn, controller.postCalculate);

module.exports = router;