const {Message} = require('../models');

const MessageController = {
  async create(req,res){
    try{

    let {usuario_id,anuncio_id,nome, email, celular, telefone, mensagem} = req.body
    
    await Message.create({
      usuario_id,
      anuncio_id,
      nome,
      email,
      celular,
      telefone,
      mensagem,
    })

      return res.json({resp:'ok'})
  }catch(err){
      console.log(err)
      return res.json({resp:'error'})
    }
  },
  listNumber: async (req, res) => {
    const {id_usuario} = req.session.user || req.user

    let totalRows = await Message.count({
      where:{
        usuario_id:id_usuario
      }
    })

    
    res.json(totalRows)

  },
  async listMessages(req,res){

    const {id_usuario} = req.session.user || req.user
    let {count} = req.body
    let limit = 8

    let {count:total,rows:messages} = await Message.findAndCountAll({
      where:{
        usuario_id:id_usuario
      },
      limit,
      offset:(count-1)*limit,

      order:[
        ['id_mensagem','DESC']
      ],
    })

  res.json({messages,total,limit})

  }
  }


module.exports = MessageController