const express = require('express')
const router = express.Router();
const PlanController = require('../controllers/PlanController');

router.get('/', PlanController.index);
router.get('/admin/create', PlanController.create);
router.get('/admin/list', PlanController.list);
router.get('/admin/active/:id', PlanController.active);

router.get('/singForm', PlanController.sign);
router.post('/signPlan', PlanController.signPlan);
router.get('/singReturn', PlanController.signReturn);

router.get('/store', PlanController.store);
// router.post('/plans', PlanController.store);

router.get('/list', PlanController.listPlan);

module.exports = router;

