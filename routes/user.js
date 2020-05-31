const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const userController = require('../controllers/UserController')


router.put('/user/update',[
    check('nome').isAlpha().withMessage('Seu nome só pode conter letras!'),
    check('nome').isLength({min:3}).withMessage('O nome precisa ter pelo menos 3 letras!'),
    check('sobrenome').isAlpha().withMessage('Seu sobrenome só pode conter letras!'),
    check('sobrenome').isLength({min:3}).withMessage('O sobrenome precisa ter pelo menos 3 letras!'),
],userController.update)


module.exports = router