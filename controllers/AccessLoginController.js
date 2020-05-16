const {User} = require('../models')

const AccessLoginController = {
    index: (req, res) => {
        res.render('pages/loginAndRegister', {css: 'loginAndRegister.css'})
    },

    store(req,res){
        let {nome,sobrenome,email,senha} = req.body

    },
    verify(req,res){
        let {email,senha} = req.body

    }
}

module.exports = AccessLoginController