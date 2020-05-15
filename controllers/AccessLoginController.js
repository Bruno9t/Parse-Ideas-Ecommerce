const AccessLoginController = {
    index: async (req, res) => {

        res.render('pages/loginAndRegister', {css: 'loginAndRegister.css'})
    }
}

module.exports = AccessLoginController