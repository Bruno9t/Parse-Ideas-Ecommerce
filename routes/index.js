const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController')

/* GET home page. */
router.get('/', HomeController.index);
router.post('/', HomeController.newslatter);


router.post('/recents',HomeController.list)

module.exports = router;
