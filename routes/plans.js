const express = require('express')
const router = express.Router();
const PlanController = require('../controllers/PlanController');

router.get('/plans', PlanController.index);
router.get('/plans/admin/create', PlanController.create);
router.get('/plans/admin/list', PlanController.list);
router.get('/plans/admin/active/:id', PlanController.active);

router.get('/plans/singForm', PlanController.sign);
router.post('/plans/signPlan', PlanController.signPlan);
router.get('/plans/singReturn', PlanController.signReturn);

router.get('/plans/store', PlanController.store);
// router.post('/plans', PlanController.store);

router.get('/list', PlanController.listPlan);
router.post('/list', PlanController.postPlan);

module.exports = router;

