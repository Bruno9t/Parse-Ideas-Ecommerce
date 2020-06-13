const {User} = require('../models')

const AdminController = {
    async index(req, res){
        try{
            const {id_usuario} = req.session.user || req.user

            const {nome,sobrenome,email,thumbnail} = await User.findByPk(id_usuario)

            return res.render('pages/admin', {css: 'admin.css',user:{nome,sobrenome,email,thumbnail},app:process.env.APP_URL})
         
        }catch(err){
            return new Error(err)
        }
    }
}

module.exports = AdminController