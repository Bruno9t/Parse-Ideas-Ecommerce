const { Announcement, Category, File, User,User_Plan,Plan} = require('../models');
const { Op } = require('sequelize');
const {check, validationResult, body} = require('express-validator');
const Email = require('../services/email');
const  path  = require('path');
const { connection, Sequelize } = require('../db/connection');


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
        const categories = await Category.findAll();
        return res.render('pages/createAnnouncement', {css: 'createAnnouncement.css', categories})
    },
    store: async (req, res) => {
        const {id_usuario} = req.session.user || req.user
        const obj = req.body;      
        const [foto,pdf] = req.files;

        const {errors} = validationResult(req);

        if(errors.length > 0){
            return res.json({msg: 'errors', erros: errors})
        }
        try {

            // const announcements = await Announcement.count('usuario_id')

            // const userPlan = await User_Plan.findOne({
            //     where:{
            //         usuario_id:id_usuario,
            //         status:1,
            //     },
            //     include:{
            //         model:Plan,
            //         as:'plano',
            //     }
            // })

            // console.log(userPlan)
            

            // const {numero_de_anuncios} = userPlan.plano

            // console.log('numero de anuncios',announcements)

            // if(!userPlan){
            //     return res.redirect('/plans/list')
            // }else{

            //     if(announcements + 1 <= numero_de_anuncios){
            //         console.log('Numero de anuncios',announcements)

                    const createdAnnouncements = await Announcement.create({
                        'categoria_id': Number(obj.type),
                        'usuario_id': id_usuario,
                        'preco': obj.price.replace('.','').replace(',','.'),
                        'valor_estimado_estoque': obj.stock.replace('.','').replace(',','.'),
                        'faturamento_mm': obj.revenues.replace('.','').replace(',','.'),
                        'lucro_mensal': obj.profit.replace('.','').replace(',','.'),
                        'data_fundacao': new Date(obj.date),
                        'descricao': obj.description,
                        'motivo_venda': obj.reason,
                        'qtd_funcionarios': Number(obj.employees),
                        'prioridade': 0,
                        'titulo': obj.title
                    })
        
        
                    if(foto){
                        await File.create({
                            'anuncio_id': createdAnnouncements.id_anuncio,
                            'arquivo': `/uploads/foto/${foto.filename}`,
                        })
                    }
            
                    if(pdf){
                        await File.create({
                            'anuncio_id': createdAnnouncements.id_anuncio,
                            'arquivo': `/uploads/pdf/${pdf.filename}`,
                        })
                    }
        
                    const user = await User.findByPk(id_usuario);
                    const category = await Category.findByPk(Number(obj.type));
        
                    let emailSend = {
                        from: 'site@parseideias.tecnologia.ws',
                        to: user.email,
                        subject: 'Parse Ideas - Criação de Anúncio',
                        text: 'Criação de Anúncio',
                        html: `
                        <h1>Novo anúncio criado no sistema</h1>
                        <p>Olá ${user.nome} ${user.sobrenome}, <br>
                        Seguem abaixo, dados do anúncio criado no sistema:
                        </p>
                        <hr>
                        <br>
                        <strong>Titulo:</strong> ${obj.title} <br>
                        <strong>Tipo:</strong> ${category.nome} <br>
                        <strong>Preco:</strong> ${obj.price} <br>
                        <strong>Valor do Estoque:</strong> ${obj.stock}<br>
                        <strong>Faturamento Médio Mensal:</strong> ${obj.revenues} <br>
                        <strong>Lucro:</strong> ${obj.profit}<br>
                        <strong>Data de Fundação:</strong> ${obj.date} <br>
                        <strong>Quantidade de Funcionários:</strong> ${obj.employees} <br>
                        <strong>Motivo:</strong> ${obj.reason} <br>
                        <strong>Descrição:</strong> ${obj.description} <br><br>
        
                        <p>Cordialmente,<br>
                        <strong>Equipe Parse Ideas®</strong>
                        </p>
                        `,
                    }
                    // Send email 
                        Email.sendMail(emailSend, (error) => {
                            if(error){
                                console.log('Deu Ruim')
                                console.log(error.message)
                            }else{
                                console.log('Email disparado com sucesso!');
                            }
                        })

                        return res.status(200).json({msg: 'success'});
            //     }else{
            //         return res.redirect('/plans/list')
            //     }
            // }
            
        } catch (error) {
            console.log(error);
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
            faturamento_mm2,
            offset
        } = req.body

        let limit = 6;
        let announces
        let count_announces

        let pag

        if(!offset){
            pag = 0;
        }else{
            pag = offset;
        }

        let a = await connection.query("select max(preco) max_prec,min(preco) min_prec, max(faturamento_mm) max_fat, min(faturamento_mm) min_fat from anuncio;",{
            type: Sequelize.QueryTypes.SELECT
        })

        let { max_prec, min_prec, max_fat, min_fat} = a[0];

        if(id_category == 0){
            announces = await Announcement.findAll({
                where: {
                    descricao: {
                        [Op.substring]: descricao || ''
                    },
                    faturamento_mm: {
                        [Op.between]:[faturamento_mm1 || min_fat, faturamento_mm2 || max_fat]
                    },
                    preco: {
                        [Op.between]:[preco1 || min_prec, preco2 || max_prec]
                    }
                },
                limit: limit,
                offset: pag*6,
                order:[
                    ['prioridade','DESC'],
                    ['created_at', 'DESC']
                ],
                include: [
                    {model: Category, as: 'categoria', require: true},
                    {model: File, as:'arquivos', required: false}
                ]
            })
            count_announces = await Announcement.count({
                where: {
                    descricao: {
                        [Op.substring]: descricao || ''
                    },
                    faturamento_mm: {
                        [Op.between]:[faturamento_mm1 || min_fat, faturamento_mm2 || max_fat]
                    },
                    preco: {
                        [Op.between]:[preco1 || min_prec, preco2 || max_prec]
                    }
                },
                order:[
                    ['prioridade','DESC'],
                    ['created_at', 'DESC']
                ],
                include: [
                    {model: Category, as: 'categoria', require: true}
                ]
            });
        } else {
            announces = await Announcement.findAll({
                where: {
                    categoria_id: id_category,
                    descricao: {
                        [Op.substring]: descricao || ''
                    },
                    faturamento_mm: {
                        [Op.between]:[faturamento_mm1 || min_fat, faturamento_mm2 || max_fat]
                    },
                    preco: {
                        [Op.between]:[preco1 || min_prec, preco2 || max_prec]
                    }
                },
                limit: limit,
                offset: pag*6,
                order:[
                    ['prioridade','DESC'],
                    ['created_at', 'DESC']
                ],
                include: [
                    {model: Category, as: 'categoria', require: true},
                    {model: File, as:'arquivos', required: false}
                ]
            })
            count_announces = await Announcement.count({
                where: {
                    categoria_id: id_category,
                    descricao: {
                        [Op.substring]: descricao || ''
                    },
                    faturamento_mm: {
                        [Op.between]:[faturamento_mm1 || min_fat, faturamento_mm2 || max_fat]
                    },
                    preco: {
                        [Op.between]:[preco1 || min_prec, preco2 || max_prec]
                    }
                },
                order:[
                    ['prioridade','DESC'],
                    ['created_at', 'DESC']
                ],
                include: [
                    {model: Category, as: 'categoria', require: true}
                ]
            })
        }

        return res.json( { announces , count_announces } )
    },
    detail: async (req, res) => {
        const {id} = req.params

        let announce = await Announcement.findByPk(id,{
            include:[
                {model: Category, as: 'categoria', required: true},
                {model: File, as:'arquivos', required: false}
            ]
        })

        if(!announce.arquivos[0]){
            announce.arquivos = [{arquivo: '/images/img/carlos-muza-hpjSkU2UYSU-unsplash.jpg'}]
        }
        
        if(!announce.titulo) {
            announce.titulo = announce.categoria.nome + " a venda!"
        }

        return res.render('pages/detailAnnouncement',{css:'detailAnnouncement.css', announce})
    },
    show: async(req, res) => {

        const {id_usuario} = req.session.user || req.user
        // const {id_usuario} = 17
        const {anuncio_id} = req.params;


        try{
            const categories = await Category.findAll(); 
            const announcements = await Announcement.findOne({
            where: {
                'id_anuncio': anuncio_id,
                'usuario_id': id_usuario,
            }
        });

            const files = await File.findAll({
                where: {
                    'anuncio_id': anuncio_id,
                }
            })

            if(!files){
                files = ''
            }

            let dataFundation = new Date(announcements.dataValues.data_fundacao);
            let day = dataFundation.getUTCDate() < 10 ? '0' + dataFundation.getUTCDate() : dataFundation.getUTCDate()
            let month = dataFundation.getUTCMonth() + 1 < 10 ? '0' + (dataFundation.getUTCMonth() + 1) : dataFundation.getUTCMonth() + 1
            // dataFundation = `${dataFundation.getUTCDate()}/${dataFundation.getUTCMonth() + 1}/${dataFundation.getFullYear()}`
            dataFundation = `${dataFundation.getFullYear()}-${month}-${day}`

            console.log(dataFundation);
            

            announcements.dataValues.data_fundacao = dataFundation;
            
            let foto = '';
            let pdf = '';

            const f = files.map(e => {
                path.extname(e.arquivo) == '.jpg' ||  path.extname(e.arquivo) == '.png' ? foto = {arquivo: e.arquivo.toString().split('\\').join('/').replace('public',''), id: e.id_arquivo } : '';
                path.extname(e.arquivo) == '.pdf' ? pdf = {arquivo: e.arquivo, id: e.id_arquivo} : '';
                return e.arquivo
            })

            return res.render('pages/updateAnnouncement',{css: 'createAnnouncement.css' , categories, announcements, foto, pdf})
            }catch(e){
                return res.status(404).render('error',{msg:'Página não encontrada!',image: '/images/svg/erro404.svg'})
            }
    },

    update: async (req, res) => {

        // const { anuncio_id } = req.params
        const {id_usuario} = req.session.user || req.user
        
        const obj = req.body;      
        console.log(obj);
        const [foto,pdf] = req.files;

        const {errors} = validationResult(req);

        if(errors.length > 0){
            return res.json({msg: 'errors', erros: errors})
        }

        try {
            
            const updatedAnnouncements = await Announcement.update({
                'categoria_id': Number(obj.type),
                'preco': obj.price.replace('.','').replace(',','.'),
                'valor_estimado_estoque': obj.stock.replace('.','').replace(',','.'),
                'faturamento_mm': obj.revenues.replace('.','').replace(',','.'),
                'lucro_mensal': obj.profit.replace('.','').replace(',','.'),
                'data_fundacao': new Date(obj.date),
                'descricao': obj.description,
                'motivo_venda': obj.reason,
                'qtd_funcionarios': Number(obj.employees),
                'prioridade': 0,
                'titulo': obj.title
            },
            { 
             where: {
                'id_anuncio': obj.id
            }
        })


            if(foto){
                await File.update(
                    {
                    'arquivo': `/uploads/foto/${foto.filename}`
                },{
                    where: {
                        'id_arquivo': obj.idFoto
                    }
                })
            }
    
            if(pdf){
                await File.update({
                    'arquivo': `/uploads/pdf/${pdf.filename}`
                },{
                    where: {
                        'id_arquivo': obj.idPdf
                    }
                })
            }

            const user = await User.findByPk(id_usuario);
            const category = await Category.findByPk(Number(obj.type));

            // let emailSend = {
            //     from: 'site@parseideias.tecnologia.ws',
            //     to: user.email,
            //     subject: 'Parse Ideas - Criação de Anúncio',
            //     text: 'Criação de Anúncio',
            //     html: `
            //     <h1>Novo anúncio criado no sistema</h1>
            //     <p>Olá ${user.nome} ${user.sobrenome}, <br>
            //     Seguem abaixo, dados do anúncio criado no sistema:
            //     </p>
            //     <hr>
            //     <br>
            //     <strong>Titulo:</strong> ${obj.title} <br>
            //     <strong>Tipo:</strong> ${category.nome} <br>
            //     <strong>Preco:</strong> ${obj.price} <br>
            //     <strong>Valor do Estoque:</strong> ${obj.stock}<br>
            //     <strong>Faturamento Médio Mensal:</strong> ${obj.revenues} <br>
            //     <strong>Lucro:</strong> ${obj.profit}<br>
            //     <strong>Data de Fundação:</strong> ${obj.date} <br>
            //     <strong>Quantidade de Funcionários:</strong> ${obj.employees} <br>
            //     <strong>Motivo:</strong> ${obj.reason} <br>
            //     <strong>Descrição:</strong> ${obj.description} <br><br>

            //     <p>Cordialmente,<br>
            //     <strong>Equipe Parse Ideas®</strong>
            //     </p>
                
            //     `,
            // }
            // // Send email 
            //     Email.sendMail(emailSend, (error) => {
            //         if(error){
            //             console.log('Deu Ruim')
            //             console.log(error.message)
            //         }else{
            //             console.log('Email disparado com sucesso!');
            //         }
            //     })
                return res.status(200).json({msg: 'success'});
        } catch (error) {
            console.log(error);
            return res.status(400).json({msg: 'error'});
        }
    },
    delete: async (req, res) => {
        const { anuncio_id } = req.params
        const {id_usuario} = req.session.user || req.user

        const ads = await Announcement.findOne({
            where: {
               'id_anuncio': anuncio_id,
                'usuario_id': id_usuario
            }
        })

        if(!ads){
            return res.status(400).json({msg: 'error'})
        }
        
        try{
            const fileRemoved = await File.destroy({
                where: {
                    'anuncio_id': anuncio_id
                }
            })
            const adsRemoved = await Announcement.destroy({
                where: {
                    'id_anuncio': anuncio_id,
                    'usuario_id': id_usuario
                }
            })

            return res.status(200).json({msg: 'success'})

        }catch{
            return res.status(400).json({msg: 'error'})
        }
    }
}

module.exports = AnnouceController;