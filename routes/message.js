const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

router.post('/create', MessageController.create);

router.get('/list/number', MessageController.listNumber)
router.post('/list/', MessageController.listMessages)

module.exports = router;