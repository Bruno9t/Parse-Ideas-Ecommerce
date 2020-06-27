const {validationResult} = require('express-validator')
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {unlinkSync,existsSync} = require('fs')
const {resolve,basename} = require('path')

module.exports = {
     async update(req,res){
        try{

        let listaDeErros = validationResult(req)

        if(listaDeErros.errors.length === 0){
            const {nome,sobrenome} = req.body

            const user = req.session.user || req.user

            await User.update({nome,sobrenome},
                {
                where:{
                    id_usuario:user.id_usuario
                },
            })

            user.nome = nome
            user.sobrenome = sobrenome

            res.json({cod:2,msg:'Dados alterados com sucesso!'})
        }else{

            return res.json(listaDeErros)

        }
    }catch(err){
        return new Error(err)
    }

    },

    async updatePass(req,res){

        try{

            let listaDeErros = validationResult(req)
    
            if(listaDeErros.errors.length === 0){
                const {senha,novaSenha} = req.body
    
                const user = req.session.user || req.user

                const realUser = await User.findByPk(user.id_usuario)

                if(await bcrypt.compare(senha,realUser.senha)){

                    let novaSenhaC = await bcrypt.hash(novaSenha,10)

                    await User.update({senha:novaSenhaC},{
                        where:{
                            id_usuario:user.id_usuario
                        }
                    })

                    res.json({cod:2,msg:'Senha alterada com sucesso!'})

                }else{
                    res.json({errors:[{
                        param:'senha',
                        msg:'Senha incorreta!'
                    }]})
                }
    
            }else{

                console.log(listaDeErros)
    
                return res.json(listaDeErros)
    
            }
        }catch(err){
            return new Error(err)
        }

        

    },

    async updatePhoto(req,res){
        

        try{
            if(!req.file){
                return res.json({code:2,msg:'Arquivo não selecionado!'})
            }

            let {filename} = req.file
            let path = `/images/uploads/${filename}`

            const user = req.session.user || req.user
            const base = basename(user.thumbnail)

            const uploadPath = resolve(`public/images/uploads/${base}`)
        
            await User.update({thumbnail:path},{
                where:{
                    id_usuario:user.id_usuario,
                },
            })

            if(existsSync(uploadPath)){
                unlinkSync(uploadPath)
            }

            user.thumbnail = path

            res.json({code:1,msg:'Foto alterada com sucesso!'})

        }catch(err){
            return new Error(err)
        }
    }
}