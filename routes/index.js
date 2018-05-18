const express = require('express');
const router = express.Router();
const MiddleWares = require('../dal/crud');

const errors = MiddleWares.errorsArray;
const success = MiddleWares.success;

router.get('/errors', errors);
router.get('/success', success);


module.exports = router;