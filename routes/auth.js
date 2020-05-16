const express = require('express');
const router = express.Router();
const AccessLoginController = require('../controllers/AccessLoginController')

/* local access */
router.get('/access', AccessLoginController.index);

router.post('/access/register',AccessLoginController.store)

router.post('/access/login',AccessLoginController.verify)

// google


// facebook



module.exports = router;
