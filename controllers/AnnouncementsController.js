const AnnouceController = {
    index: async (req, res) => {
        

        const {category} = req.query

        
        // Fazer query no banco de dados conforme o parametro enviado

        console.log(req.session)

        res.render('pages/searchAnnouncements', {css: 'searchEcommerce.css'})
    }
}

module.exports = AnnouceController;