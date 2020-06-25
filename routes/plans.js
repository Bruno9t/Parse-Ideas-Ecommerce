const express = require('express')
const router = express.Router();
const PlanController = require('../controllers/PlanController');

router.get('/plans', PlanController.index);
router.get('/plans/admin/create', PlanController.create);
router.get('/plans/admin/list', PlanController.list);
router.get('/plans/admin/active/:id', PlanController.active);

router.get('/plans/choose',PlanController.choose)

router.get('/plans/sign/:plan_code', PlanController.sign);
router.post('/plans/sign/:plan_code', PlanController.signPlan);
router.post('/plans/cancel/:assinatura_id',PlanController.cancelPlan)
router.post('/plans/reactive/:assinatura_id',PlanController.reactivePlan)
router.post('/plans/alter/sign/:plan_code',PlanController.alterPlan)
router.get('/plans/alter/sign/:plan_code',PlanController.listAlterPlanPayment)
router.post('/plans/alter/sub',PlanController.toAlterPlan)
router.get('/plans/alter',PlanController.listAlterPlans)
router.get('/plans/singReturn', PlanController.signReturn);

router.get('/plans/store', PlanController.store);
// router.post('/plans', PlanController.store);

router.get('/plans/list', PlanController.listPlan);
router.post('/plans/list', PlanController.postPlan);

module.exports = router;

