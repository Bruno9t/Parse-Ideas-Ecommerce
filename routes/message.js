const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

router.post('/message/create', MessageController.create);

router.get('/message/list/number', MessageController.listNumber)
router.post('/message/list/', MessageController.listMessages)

module.exports = router;