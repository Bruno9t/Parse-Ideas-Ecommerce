const express = require('express');
const router = express.Router();

const passportGoogle = require('../config/passport-auth/passport-google')

const AccessLoginController = require('../controllers/AccessLoginController')

/* local access */
router.get('/access', AccessLoginController.index);

router.post('/access/register',AccessLoginController.store)

router.post('/access/login',AccessLoginController.verify)

// google

router.get('/access/google',passportGoogle.authenticate("google",{
    scope:['profile','email']
  }))

router.get('/access/google/redirect',passportGoogle.authenticate("google",{
    failureRedirect:'/access'
  }),function (req,res){
    // return res.json({user:req.user,session:req.session})
    res.redirect('/announce/create')
  })
  
// facebook



module.exports = router;
