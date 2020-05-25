const express = require('express');
const router = express.Router();
const AnnouncementsController = require('../controllers/AnnouncementsController')


/* Listagem de anúncios */
router.get('/', AnnouncementsController.index);

/* Tela para cadastro do anúncio */
router.get('/create', AnnouncementsController.create);

/* Gravar anúncio */
// router.post('/create', AnnouncementsController.store);

module.exports = router;
