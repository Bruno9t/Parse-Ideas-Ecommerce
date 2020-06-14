const {Announcement,Category,} = require('../models')
const nodemailer = require('nodemailer')
require('dotenv').config()


const HomeController = {
    index(req, res){


        return res.render('index', {css: 'index.css'})
    },

    newslatter(req, res) {
        let {email} = req.body

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
            to: email, // list of receivers
            subject: "Newsletter ✔", // Subject line
            text: "Olá obrigada por se cadastrar na nossa newsletter",
        }).then(message => {
            console.log(message)
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
    }


}

module.exports = HomeController