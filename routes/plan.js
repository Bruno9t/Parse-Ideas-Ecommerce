const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('plans/viewAdPlans');
})

module.exports = router;