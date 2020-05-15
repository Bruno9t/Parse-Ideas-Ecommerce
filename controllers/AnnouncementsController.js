const AnnouceController = {
    index: async (req, res) => {

        const {category} = req.query

        // Fazer querie no banco de dados conforme o parametro enviado

        res.render('pages/searchEcommerce', {css: 'searchEcommerce.css'})
    }
}

module.exports = AnnouceController;