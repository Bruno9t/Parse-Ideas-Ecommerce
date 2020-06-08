const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AnnouncementsController = require('../controllers/AnnouncementsController')
const multerStorage = require('../middlewares/upload');

let upload = multerStorage();

/* Listagem de anúncios */
router.get('/', AnnouncementsController.index);

/* Tela para cadastro do anúncio */
router.get('/create',auth, AnnouncementsController.create);

router.get('/detail/:id', AnnouncementsController.detail)

/* Search dos anuncios */
router.post('/search', AnnouncementsController.search);

/* Criar anúncio */
router.post('/create',upload.any(), AnnouncementsController.store);

module.exports = router;
