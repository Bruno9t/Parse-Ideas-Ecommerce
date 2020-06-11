const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AnnouncementsController = require('../controllers/AnnouncementsController')
const multerStorage = require('../middlewares/upload');
const { check, validationResult, body } = require('express-validator');



let upload = multerStorage('public/uploads/foto',null,'public/uploads/pdf');

/* Listagem de anúncios */
router.get('/', AnnouncementsController.index);

/* Tela para cadastro do anúncio */
router.get('/create',auth, AnnouncementsController.create);

router.get('/detail/:id', AnnouncementsController.detail)

/* Search dos anuncios */
router.post('/search', AnnouncementsController.search);

/* Gravar anúncio */
router.post('/create', upload.any(),[
    check('title').isLength({min:5}).withMessage('Preencha o campo título'),
    check('type').isIn(['1','2','3']).withMessage('Informe o tipo do negócio'),
    check('price').isLength({min: 1}).withMessage('Defina o preço de venda'),
    check('stock').isLength({min: 1}).withMessage('Preencha o campo valor estimado do estoque'),
    check('revenues').isLength({min: 1}).withMessage('Preencha o campo faturamento médido mensal'),
    check('profit').isLength({min: 1}).withMessage('Preencha o campo lucro mensal'),
    check('age').isLength({min: 1}).withMessage('Informe e idade da empresa'),
    check('description').isLength({ min: 5}).withMessage('Escreva a descrição do anúncio'),
    check('reason').isLength({ min: 5}).withMessage('Informe o motivo da venda'),
    check('employees').isLength({min: 1}).withMessage('Informe a quantidade de funcionário')
] ,AnnouncementsController.store);

module.exports = router;
