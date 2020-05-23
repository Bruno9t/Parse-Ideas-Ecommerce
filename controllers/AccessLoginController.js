const { User } = require('../models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

const AccessLoginController = {
    index: (req, res) => {
        res.render('pages/loginAndRegister', {css: 'loginAndRegister.css'})
    },

    store(req,res){

        let listaDeErros = validationResult(req)

        console.log(listaDeErros)
        console.log(req.body)

        if(listaDeErros.errors.length === 0){
            let {nome,sobrenome,email,senha} = req.body
            //cadastrar usuário
            console.log('sem erro')
            res.json(listaDeErros)

        }else{
            console.log('com erro')
            res.json(listaDeErros)

        }

    },
    verify(req,res){
        let listaDeErros = validationResult(req)

        console.log(listaDeErros)

        if(listaDeErros.errors.length === 0){
        let {email,senha} = req.body
            //verificar email e senha
            console.log('sem erro')
         res.json(listaDeErros)
        }else{
            console.log('com erro')
            res.json(listaDeErros)
        }

        
    }
}

module.exports = AccessLoginController