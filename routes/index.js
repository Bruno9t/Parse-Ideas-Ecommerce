const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController')



/* GET home page. */
router.get('/', HomeController.index);

router.post('/newsletter', HomeController.newsletter);
router.post('/recents',HomeController.list);
router.post('/contact',HomeController.contact);

module.exports = router;
