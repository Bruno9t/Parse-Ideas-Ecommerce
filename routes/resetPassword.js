const express = require('express')
const router = express.Router()
const {check,body} = require('express-validator')

const ResetPassword = require('../controllers/ResetPassword')


router.get('/reset/:id/:token',ResetPassword.index)
router.patch('/reset',[
    check('newPass').isLength({min:8}).withMessage('A senha deve conter pelo menos 8 dígitos!'),
    body('confNewPass').custom((value,{req})=>{
        if (value !== req.body.newPass) {throw new Error("As senhas não são iguais!");} else {return value;}}),
],ResetPassword.update)


module.exports = router