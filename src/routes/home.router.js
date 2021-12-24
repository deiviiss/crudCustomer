const express = require('express');
const router = express.Router();

//controller home
const controller = require('../controllers/home.controller');

//router index
router.get('/', controller.home);

module.exports = router;