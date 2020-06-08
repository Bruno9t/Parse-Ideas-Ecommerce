const { Announcement, Category, File } = require('../models')
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
    create: async (req, res) => {
        // return res.send('teste')
        return res.render('pages/createAnnouncement', {css: 'createAnnouncement.css'})
    },
    store: async (req, res) => {
        const {id_usuario} = req.session.user || req.user
        const obj = req.body;      
        const [foto,pdf] = req.files;

        //title
        //type
        //price
        //stock
        //revenues
        //profit
        //age
        //reason
        //employees
        //description
        //foto
        //pdf

        try {
            const createdAnnouncements = await Announcement.create({
                'categoria_id': Number(obj.type),
                'usuario_id': id_usuario,
                'preco': obj.price.replace('R$ ', '').replace('.','').replace(',','.'),
                'valor_estimado_estoque': obj.stock.replace('R$ ', '').replace('.','').replace(',','.'),
                'faturamento_mm': obj.revenues.replace('R$ ', '').replace('.','').replace(',','.'),
                'lucro_mensal': obj.profit.replace('R$ ', '').replace('.','').replace(',','.'),
                'data_fundacao': Number(obj.age),
                'descricao': obj.description,
                'motivo_venda': obj.reason,
                'qtd_funcionarios': Number(obj.employees),
                'prioridade': 0,
                'titulo': obj.title
            })

            if(foto){
                await File.create({
                    'anuncio_id': createdAnnouncements.id_anuncio,
                    'arquivo': foto.path
                })
            }
    
            if(pdf){
                await File.create({
                    'anuncio_id': createdAnnouncements.id_anuncio,
                    'arquivo': pdf.path
                })
            }
                return res.status(200).json({msg: 'success'});
        } catch (error) {
            return res.status(400).json({msg: 'error'});
        }
        

        
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
    },
    detail: async (req, res) => {
        const {id} = req.params

        let announce = await Announcement.findByPk(id,{
            include:[{model: Category, as: 'categoria', required: true}]
        })

        return res.render('pages/detailAnnouncement',{css:'detailAnnouncement.css', announce})
    }
}

module.exports = AnnouceController;