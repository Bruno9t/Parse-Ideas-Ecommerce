const express = require('express');
const router = express.Router();
const MessageControler = require('../controllers/MessageController');

router.post('/create', MessageControler.create);

module.exports = router;