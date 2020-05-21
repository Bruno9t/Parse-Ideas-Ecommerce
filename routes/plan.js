const express = require('express')
const router = express.Router();
const PlanController = require('../controllers/PlanController')

router.get('/', PlanController.index);

module.exports = router;