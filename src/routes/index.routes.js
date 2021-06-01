const express = require('express');
const router = express.Router();

//controller index.js
const controller = require('../controllers/index.controller');

//router index
router.get('/', controller.index);

module.exports = router;