const {Announcement,Category,} = require('../models')

const HomeController = {
    index(req, res){
        return res.render('index', {css: 'index.css'})
    },


    async list(req,res){
        let {count} = req.body
        let limit = 3

        let {count:total,rows:anuncios} = await Announcement.findAndCountAll({
            limit,
            offset:(count-1)*limit,
            include:{
                model:Category,
                as:'categoria',
                required:true,
            }
        })


        return res.json({anuncios,total,limit})


    }


}

module.exports = HomeController