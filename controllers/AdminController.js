const {User} = require('../models')

const AdminController = {
    async index(req, res){
        

        const {nome,sobrenome,email} = await User.findByPk(req.session.user.id_usuario)


        return res.render('pages/admin', {css: 'admin.css',user:{nome,sobrenome,email}}) 
    }
}

module.exports = AdminController