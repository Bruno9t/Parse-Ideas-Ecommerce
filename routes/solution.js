const express = require('express');
const router = express.Router();
const SolutionController = require('../controllers/SolutionController')


/* GET home page. */
router.get('/', SolutionController.index);

module.exports = router;
