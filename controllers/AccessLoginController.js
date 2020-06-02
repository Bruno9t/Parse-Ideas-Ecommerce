const { User } = require('../models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

const AccessLoginController = {
    index: (req, res) => {

        res.render('pages/loginAndRegister', {css: 'loginAndRegister.css'})
    },

    async store(req,res){

        let listaDeErros = validationResult(req)

        if(listaDeErros.errors.length === 0){
            
            let {nome,sobrenome,email,senha} = req.body

            senha = await bcrypt.hash(senha,10)

            let {id_usuario} = await User.create({nome,sobrenome,email,senha})

            req.session.user = {
                id_usuario,
            }
            
            res.json(listaDeErros)
        }else{

            res.json(listaDeErros)

        }

    },
    async verify(req,res){

    try{
        
        let listaDeErros = validationResult(req)

        if(listaDeErros.errors.length === 0){
        let {email,senha} = req.body

        let user = await User.findOne({where:{email}})

        if(user && await bcrypt.compare(senha,user.senha)){

            req.session.user = {
                id_usuario:user.id_usuario,
                thumbnail:user.thumbnail
            }

            res.json(listaDeErros)
        }

        res.json({cod:1,msg:'Usuário ou senha inválido'})

        }else{
            res.json(listaDeErros)
        }

    }catch (error) {
        return new Error(error)
    }
        
    }
}

module.exports = AccessLoginController