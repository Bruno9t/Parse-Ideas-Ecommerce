const { Announcement, Category } = require('../models')
const { Op } = require('sequelize')

const AnnouceController = {
    index: async (req, res) => {
        //esse valor 1 é pra caso o usuário não passe nenhum id(valor padrão)
        const {id_category = 1} = req.query

        let category = await Category.findByPk(id_category)
        let {count:total, rows:announces} = await Announcement.findAll({
            where: {
                categoria_id: id_category
            },
            limit: 30,
            include: [{model: Category, as: 'categoria', required: true}]
        })

        res.render('pages/searchAnnouncements', 
        {css: 'searchEcommerce.css', category: category})
    },
    create: (req, res) => {
        // return res.send('teste')
        return res.render('pages/createAnnouncement', {css: 'createAnnouncement.css'})
    },
    search: async (req, res) => {
        const {
            id_category = 1,
            descricao,
            preco1,
            preco2,
            faturamento_mm1,
            faturamento_mm2
        } = req.body

        let announces

        if(id_category == 0){
            announces = await Announcement.findAll({
                where: {
                    descricao: {
                        [Op.substring]: descricao || ' '
                    },
                    faturamento_mm: {
                        [Op.between]:[faturamento_mm1 || 0,faturamento_mm2 || 400000]
                    },
                    preco: {
                        [Op.between]:[preco1 || 0, preco2 || 99999999]
                    }
                },
                limit: 30,
                order:[
                    ['prioridade','DESC'],
                    ['created_at', 'DESC']
                ],
                include: [{model: Category, as: 'categoria', require: true}]
            })
        } else {
            announces = await Announcement.findAll({
                where: {
                    categoria_id: id_category,
                    descricao: {
                        [Op.substring]: descricao || ' '
                    },
                    faturamento_mm: {
                        [Op.between]:[faturamento_mm1 || 0,faturamento_mm2 || 400000]
                    },
                    preco: {
                        [Op.between]:[preco1 || 0, preco2 || 99999999]
                    }
                },
                limit: 30,
                order:[
                    ['prioridade','DESC'],
                    ['created_at', 'DESC']
                ],
                include: [{model: Category, as: 'categoria', required: true}]
            })
        }

        

        return res.json(announces)
    }
}

module.exports = AnnouceController;