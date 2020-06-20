const express = require('express');
const router = express.Router();
const AboutUsController = require('../controllers/AboutUsController')


/* Listagem de anúncios */
router.get('/aboutus', AboutUsController.index);


module.exports = router;

