const express = require('express');
const router = express.Router();
const AccessLoginController = require('../controllers/AccessLoginController')

/* GET home page. */
router.get('/', AccessLoginController.index);

module.exports = router;
