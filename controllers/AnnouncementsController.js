const { Announcement, Category } = require('../models')

const AnnouceController = {
    index: async (req, res) => {
    
        const {id_category} = req.query

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