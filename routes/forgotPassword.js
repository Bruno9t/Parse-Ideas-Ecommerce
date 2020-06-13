const express = require('express')
const {User} = require('../models')
const {check,body} = require('express-validator')

const router = express.Router()

const ForgotPassword = require('../controllers/ForgotPassword')


router.get('/forgot',ForgotPassword.index)
router.patch('/forgot',[
    check('email').isEmail().withMessage('Formato de e-mail inválido!'),
],ForgotPassword.send)



module.exports = router