const express = require('express')
const router = express.Router()
const {check,body} = require('express-validator')
const UserController = require('../controllers/UserController')


router.put('/panel/user/update',[
    check('nome').isAlpha().withMessage('Seu nome só pode conter letras!'),
    check('nome').isLength({min:3}).withMessage('O nome precisa ter pelo menos 3 letras!'),
    check('sobrenome').isAlpha().withMessage('Seu sobrenome só pode conter letras!'),
    check('sobrenome').isLength({min:3}).withMessage('O sobrenome precisa ter pelo menos 3 letras!'),
],UserController.update)

router.put('/panel/password/update',[
    check('senha').isLength({min:8}).withMessage('A senha deve conter pelo menos 8 dígitos!'),
    check('novaSenha').isLength({min:8}).withMessage('A senha deve conter pelo menos 8 dígitos!'),
    body('confSenha').custom((value,{req})=>{
        if (value !== req.body.novaSenha) {throw new Error("As senhas não são iguais!");} else {return value}}),
],UserController.updatePass)

router.put('/panel/photo/update',UserController.updatePhoto)


router.get('/logout',(req,res)=>{
    if(req.user){
        req.logout()
    }else{
        req.session.user = ''
    }
    res.redirect('/')
})


module.exports = router