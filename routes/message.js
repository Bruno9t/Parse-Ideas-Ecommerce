const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

router.post('/create', MessageController.create);

router.get('/list', MessageController.list)

module.exports = router;