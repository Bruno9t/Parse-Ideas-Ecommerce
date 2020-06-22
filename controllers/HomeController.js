const {Announcement,Category,} = require('../models');
const nodemailer = require('nodemailer');
const Email = require('../services/email');
require('dotenv').config()


const HomeController = {
    index(req, res){
        return res.render('index', {css: 'index.css'})
    },

    newsletter(req, res) {
        let {name, email} = req.body
        let transporter = nodemailer.createTransport({
            host: process.env.EM_HOST,
            port: process.env.EM_PORT,
            secure: true,
            auth: {
                user: process.env.EM_USER, 
                pass: process.env.EM_PASS, 
            },
            tls: {
                rejectUnauthorized: false
            },
        });

        transporter.sendMail({
            from: '"Parse Ideias 👻" <site@parseideias.tecnologia.ws>',
            to: email,
            subject: "Newsletter ✔",
            text: `Olá ${name}, obrigada por se cadastrar na nossa newsletter, agora você tem acesso nosso conteúdo exclusivo.`,
        }).then(message => {
            console.log(message)
            res.json({"nome": name, "email": email})
        }).catch(err => {
            console.log(err)
        })
  
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
            to: 'bruno.rafael10@globomail.com',
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