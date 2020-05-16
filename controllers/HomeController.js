const HomeController = {
    index(req, res){
        return res.render('index', {css: 'index.css'})
    }
}

module.exports = HomeController