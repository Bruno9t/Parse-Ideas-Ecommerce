const {User, Announcement,Category,User_Plan,Plan} = require('../models')
const recurly = require('recurly');

const client = new recurly.Client(process.env.RECURLY_KEY)


const AdminController = {
    async index(req, res){
        try{
            const {id_usuario} = req.session.user || req.user
            let dateNow = new Date()

            const {nome,sobrenome,email,thumbnail} = await User.findByPk(id_usuario)

            const subs = await User_Plan.findOne({
                where:{
                    usuario_id:id_usuario,
                    status:1
                },
                include:{
                    model:Plan,
                    as:'plano',
                }
            })

            function isInTrial(trialStarted){

                if(dateNow<=trialStarted){
                    return true
                }else{
                    return true
                }
            }

            const formatter = new Intl.NumberFormat('pt-BR', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL' 
              });

            if(subs){
                const {state,trialEndsAt,unitAmount,plan} = await client.getSubscription(subs.assinatura_id)

                console.log(state)

                return res.render('pages/admin', {css: 'admin.css',user:{nome,sobrenome,email,thumbnail},
                app:process.env.APP_URL,
                assinatura:{
                    nome:plan.name,
                    valor:unitAmount,
                    status:state,
                    anuncios:subs.plano.numero_de_anuncios,
                    fotos:subs.plano.numero_de_fotos,
                    trialTime:isInTrial(trialEndsAt)
                },formatter,
            })
        }else{
            return res.render('pages/admin', {css: 'admin.css',user:{nome,sobrenome,email,thumbnail},
            app:process.env.APP_URL,
            assinatura:false,
        })
        }
         
        }catch(err){
            if (err instanceof recurly.errors.NotFoundError) {

                console.log('Resource Not Found')
              } else {

                console.log('Unknown Error: ', err)
              }
        }
    },

    async listAnnouncements(req,res){
    try{
        const {previousClickLI} = req.body
        const {id_usuario:usuario_id} = req.session.user || req.user
        const limit = 6

        console.log(previousClickLI)

        const {count:total,rows:announcements} = await Announcement.findAndCountAll({
            where:{usuario_id},
            limit,
            offset:(previousClickLI-1)*limit,
            order:[
                ['id_anuncio', 'DESC'],
            ],
            include:{
                model:Category,
                as:'categoria',
                required:true,
            }
        })

        return res.json({announcements,total,limit})
    }catch(err){
        console.log(err)
        return res.json('Algo deu errado!')
    }
    }
}

module.exports = AdminController