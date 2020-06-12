const { User } = require('../models')

module.exports = {
    async index(req,res){
        const {id,token} = req.params
        const now = new Date()

        const user = await User.findByPk(id)

        if(user){

        if(user.password_reset_token == token){

            if(now < user.expires_token){

                return res.render('pages/resetPassword',{css:'resetPassword.css'})
            }else{

                return res.render('error',{msg:'Token expirado!',image:'/images/svg/relogio.svg'})
            }
        }else{
            return res.render('error',{msg:'Token inválido!',image:'/images/svg/cadeado.svg'})
        }
    }else{
        return res.render('error',{msg:'Usuário não encontrado!',image:'/images/svg/erro.svg'})

    }
    },
    async update(req,res){
        const {id_usuario, newPass, confNewPass} = req.body

        console.log(req.body)
    }
}