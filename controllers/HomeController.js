const {Announcement,Category, Newsletter} = require('../models');
const nodemailer = require('nodemailer');
const Email = require('../services/email');
require('dotenv').config()


const HomeController = {
    index(req, res){
        return res.render('index', {css: 'index.css'})
    },

    async newsletter(req, res) {
        let {name, email} = req.body;

        if(name && email){
            try{
                const news = await Newsletter.create({
                    nome: `${name}`,
                    email: `${email}`
              })

              if(news){
                return res.status(200).json({msg: "success"})
                }else{
                    return res.status(400).json({msg: "error"})
                }
            }catch{
                return res.status(400).json({msg: "error"})
            }
        }
    },
    async list(req,res){
        let {count} = req.body
        let limit = 6

        let {count:total,rows:anuncios} = await Announcement.findAndCountAll({
            limit,
            offset:(count-1)*limit,
            order:[
                ['prioridade', 'DESC'],
                ['id_anuncio', 'DESC'],
            ],
            include:{
                model:Category,
                as:'categoria',
                required:true,
            }
        })
        return res.json({anuncios,total,limit})
    },
    async contact (req, res){

        const obj = req.body;
       
        // return res.status(200).json({body: obj});
        // return res.status(200).json({msg: 'success'});
        
        let emailSend = {
            from: 'site@parseideias.tecnologia.ws',
            to: 'brudev01@gmail.com',
            subject: 'Parse Ideas - Contato',
            text: 'Parse Ideas - Contato',
            html: `
            <h1>Novo contato realizado pelo site</h1>
            <p>Nome: ${obj.name}</p>
            <p>Email: ${obj.email}</p>
            <p>Assunto: ${obj.subject}</p>
            <p>Mensagem: ${obj.message}</p>
    
            <p>Cordialmente,<br>
            <strong>Equipe Parse Ideas®</strong>
            </p>
            `,
        }
            Email.sendMail(emailSend, (error) => {
                if(error){
                    console.log('Deu Ruim')
                    console.log(error.message)
                    return res.status(500).json({msg: 'error'});
                }else{
                    console.log('Email disparado com sucesso!');
                    return res.status(200).json({msg: 'success'});
            }
        })
    }
}

module.exports = HomeController