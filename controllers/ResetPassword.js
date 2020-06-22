const { User } = require('../models')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

module.exports = {
    async index(req,res){
        const {id,token} = req.params
        const now = new Date()

        const user = await User.findByPk(id)

        if(user){

        if(user.password_reset_token == token){

            if(now < user.expires_token){

                return res.render('pages/resetPassword',{css:'resetPassword.css',app:process.env.APP_URL})
            }else{

                return res.render('error',{msg:'Seu tempo acabou!',image:'/images/svg/relogio.svg'})
            }
        }else{
            return res.render('error',{msg:'Esse link não é mais válido!',image:'/images/svg/cadeado.svg'})
        }
    }else{
        return res.render('error',{msg:'Esse link não é mais válido!',image:'/images/svg/erro.svg'})

    }
    },
    async update(req,res){

        try{

            let errorList = validationResult(req)

        if(errorList.errors.length==0){
        const {id_usuario, newPass} = req.body

        let newPassC = bcrypt.hashSync(newPass,10)

        await User.update({senha:newPassC,password_reset_token:'',expires_token:''},{
            where:{
                id_usuario,
            }
        })

        res.json({cod:1,msg:'Sua senha foi alterada!'})
    }else{
        return res.json(errorList)
    }
    }catch(err){
        return res.json({cod:2,msg:'Algo deu errado!'})

    }


    }
}