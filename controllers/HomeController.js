const HomeController = {
    index: async (req, res) => {
        res.render('index', {css: 'index.css'})
    }
}

module.exports = HomeController