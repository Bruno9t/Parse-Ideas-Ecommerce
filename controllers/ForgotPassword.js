const Email = require('../services/email.js')
const {User} = require('../models') 
const crypto = require('crypto')
const {EM_USER,APP_URL} = process.env

module.exports = {
    index(req,res){
        return res.render('pages/forgotPassword',{css: 'forgotPassword.css'})
    },

    async send(req,res){
    try{
        const {email} = req.body

        const user = await User.findOne({
            where:{
                email,
            }
        })


        if(!user){
            return res.send('User not found')
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

        console.log(token,expiresIn)

        let configMail = {
            from:EM_USER,
            to:email,
            subject:`Alteração de senha`,
            text:`Clique neste link para alterar a senha:${APP_URL}/reset/${user.id_usuario}/${token}`
        }

        Email.sendMail(configMail,(err)=>{

            console.log(err)

            if(err){
                res.send(err)
            }

            res.send('Email enviado!')
        })
    }catch(err){
        res.send('Deu erro!')
    }
    }
}