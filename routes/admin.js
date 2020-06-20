const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')
const auth = require('../middlewares/auth')


/* Listagem de anúncios */
router.get('/panel',auth, AdminController.index);

router.post('/panel/user/announcements',AdminController.listAnnouncements);


module.exports = router;


