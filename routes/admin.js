const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')


/* Listagem de anúncios */
router.get('/', AdminController.index);

module.exports = router;


