const {validationResult} = require('express-validator')
const {User} = require('../models')

module.exports = {
     async update(req,res){
        try{

        let listaDeErros = validationResult(req)

        if(listaDeErros.errors.length === 0){
            const {nome,sobrenome} = req.body
            const {id_usuario} = req.session.user || req.user

            await User.update({nome,sobrenome},
                {
                where:{
                    id_usuario,
                },
            })

            req.session.user.sobrenome = sobrenome
            req.session.user.nome = nome 

            res.json({cod:2,msg:'Dados alterados com sucesso!'})
        }else{

            return res.json(listaDeErros)

        }
    }catch(err){
        return new Error(err)
    }

    }
}