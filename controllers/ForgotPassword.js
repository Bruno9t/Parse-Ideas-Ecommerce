const Email = require('../services/email.js')
const {User} = require('../models') 
const crypto = require('crypto')
const renderFile = require('../services/ejsRenderFile')
const {validationResult} = require('express-validator')
const {EM_USER,APP_URL} = process.env

module.exports = {
    index(req,res){
        return res.render('pages/forgotPassword',{css: 'forgotPassword.css'})
    },

    async send(req,res){

    try{
        let errorList = validationResult(req)

        if(errorList.errors.length==0){

        const {email} = req.body

        const user = await User.findOne({
            where:{
                email,
            }
        })

        if(!user){
            return res.json({errors:[{
                msg:'Usuário não existe!'
            }]})
        }

        let token = crypto.randomBytes(20).toString('hex')
        let expiresIn = new Date()
        expiresIn.setHours(expiresIn.getHours() + 1)

        await User.update(
            {
                'password_reset_token':token,
                'expires_token': expiresIn,
            },
            {
            where:{
                email,
            }
        })

        renderFile('emailViews/resetPasswordView.ejs',
        {
            nome:user.nome,
            sobrenome:user.sobrenome,
            id:user.id_usuario,
            token,
            app:APP_URL,

        }).then(data => {

            let configMail = {
                from:EM_USER,
                to:email,
                subject:`Alteração de senha`,
                html:data
            }

            Email.sendMail(configMail,(err)=>{

    
                if(err){
                    res.json({cod:2,
                        msg:`Desculpe, tivemos um problema durante o envio do e-mail.
                             Tente novamente mais tarde :(
                        `})
                }
    
                res.json({cod:1,msg:'Um e-mail foi enviado para você, verifique seu e-mail!'})
            })

        })
    }else{
        return res.json(errorList)
    }

    }catch(err){
        res.json({cod:2,msg:'Ocorreu um erro, tente novamente mais tarde.'})
    }
}
}