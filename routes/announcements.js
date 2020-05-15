const express = require('express');
const router = express.Router();
const AnnouncementsController = require('../controllers/AnnouncementsController')


/* GET home page. */
router.get('/', AnnouncementsController.index);

module.exports = router;
