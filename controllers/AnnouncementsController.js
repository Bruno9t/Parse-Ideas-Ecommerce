const { Announcement, Category } = require('../models')

const AnnouceController = {
    index: async (req, res) => {
        //esse valor 1 é pra caso o usuário não passe nenhum id(valor padrão)
        const {id_category = 1} = req.query

        let category = await Category.findByPk(id_category)
        let announces = await Announcement.findAll({
            where: {
                categoria_id: id_category
            },
            limit: 30,
            include: [{model: Category, as: 'categoria', required: true}]
        })

        console.log("-----------------")
        console.log(announces)

        res.render('pages/searchAnnouncements', 
        {css: 'searchEcommerce.css', category: category, announces: announces})
    }
}

module.exports = AnnouceController;