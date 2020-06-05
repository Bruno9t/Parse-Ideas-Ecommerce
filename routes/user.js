const express = require('express')
const router = express.Router()
const {check,body} = require('express-validator')
const UserController = require('../controllers/UserController')
const multer = require('multer')
const multerStorage = require('../middlewares/upload')
const {extname} = require('path')

let upload = multerStorage({
    limits:{
        fileSize:500000,
    },
    fileFilter(req,file,cb){
        console.log(req.files)
        let acceptImages = ['.svg','.png','.jpg']
        if(acceptImages.includes(extname(file.originalname))){
            cb(null,true)
        }else{
            cb({code:2,msg:'Tipo de arquivo não permitido!'},false)
        }
    }
}).single('file')


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
        if (value !== req.body.novaSenha || req.body.novaSenha=='' ) {throw new Error("As senhas não são iguais!");} else {return value}}),
],UserController.updatePass)

router.put('/panel/photo/update',function(req,res,next){

    return upload(req, res, function (err) {

        if (err) {

          return res.json(err)
        }
     
          return next()
        })
    

},UserController.updatePhoto)


router.get('/logout',(req,res)=>{
    if(req.user){
        req.logout()
    }else{
        req.session.user = ''
    }
    res.redirect('/')
})


module.exports = router