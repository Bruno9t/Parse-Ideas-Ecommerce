const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AnnouncementsController = require('../controllers/AnnouncementsController')
const multer = require('multer') 

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
let upload = multer({ storage: storage })




/* Listagem de anúncios */
router.get('/', AnnouncementsController.index);

/* Tela para cadastro do anúncio */
router.get('/create', /*auth,*/ AnnouncementsController.create);

/* Gravar anúncio */
router.post('/create', upload.any(), AnnouncementsController.store);

module.exports = router;
