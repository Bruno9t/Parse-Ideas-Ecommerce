const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AnnouncementsController = require('../controllers/AnnouncementsController')


/* Listagem de anúncios */
router.get('/', AnnouncementsController.index);

/* Search dos anuncios */
router.post('/search', AnnouncementsController.search);

/* Tela para cadastro do anúncio */
router.get('/create', auth, AnnouncementsController.create);

/* Gravar anúncio */
// router.post('/create', AnnouncementsController.store);

module.exports = router;
