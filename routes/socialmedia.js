const express = require('express');
const router = express.Router();
const SocialMediaController = require('../controllers/SocialMediaController')


/* GET home page. */
router.get('/', SocialMediaController.index);

module.exports = router;
