const express = require('express');
const {check,body} = require('express-validator')
const {User} = require('../models')
const bcrypt = require('bcrypt')
const router = express.Router();

const passportGoogle = require('../services/passport-auth/passport-google')
const passportFacebook = require('../services/passport-auth/passport-facebook')

const AccessLoginController = require('../controllers/AccessLoginController')

/* local access */
router.get('/auth/access', AccessLoginController.index);

router.post('/auth/access/register',[
  check('nome').isAlpha().withMessage('Seu nome só pode conter letras!'),
  check('nome').isLength({min:3}).withMessage('O nome precisa ter pelo menos 3 letras!'),
  check('email').isEmail().withMessage('Formato de e-mail inválido!'),
  check('senha').isLength({min:8}).withMessage('A senha deve conter pelo menos 8 dígitos!'),

  body('confSenha').custom((value,{req})=>{
  if (value !== req.body.senha) {throw new Error("As senhas não são iguais!");} else {return value;}}),

  body('email').custom(async (email)=>{
    let user = await User.findOne({where:{email}})
    if(user){throw new Error('Usuário já existe!')}else{return email}}),

],AccessLoginController.store)
 

router.post('/auth/access/login',[
  check('email').isEmail().withMessage('Formato de e-mail inválido!'),
  check('senha').isLength({min:8}).withMessage('A senha deve conter pelo menos 8 dígitos!'), 
 ],AccessLoginController.verify)

// google
router.get('/auth/access/google',passportGoogle.authenticate("google",{
    scope:['profile','email']
  }))

router.get('/auth/access/google/redirect',passportGoogle.authenticate("google",{
    failureRedirect:'/access',
  }),function (req,res){

    return res.send(`<html><body><script>window.location = window.location.origin +'/panel'</script></body></html>`)

  })
  
// facebook
router.get('/auth/access/facebook',passportFacebook.authenticate('facebook',{ scope : ['email'] }))

router.get('/auth/access/facebook/redirect',passportFacebook.authenticate("facebook",{
  failureRedirect:'/access'
}),function(req,res){
  return res.send(`<html><body><script>window.location = window.location.origin +'/panel'</script></body></html>`)
})





module.exports = router;
