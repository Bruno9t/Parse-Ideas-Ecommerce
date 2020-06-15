const {User, Announcement,Category} = require('../models')


const AdminController = {
    async index(req, res){
        try{
            const {id_usuario} = req.session.user || req.user

            const {nome,sobrenome,email,thumbnail} = await User.findByPk(id_usuario)

            return res.render('pages/admin', {css: 'admin.css',user:{nome,sobrenome,email,thumbnail},app:process.env.APP_URL})
         
        }catch(err){
            return new Error(err)
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