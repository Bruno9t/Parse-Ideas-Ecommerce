const HomeController = {
    index: async (req, res) => {
        res.render('pages/searchEcommerce', {css: 'searchEcommerce.css'})
    }
}

module.exports = HomeController