const express = require('express');
const router = express.Router();
const EcommerceController = require('../controllers/EcommerceController')


/* GET home page. */
router.get('/', EcommerceController.index);

module.exports = router;
