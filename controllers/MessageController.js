const {Message} = require('../models');

const MessageController = {
  create: async (req,res)=>{
    let {usuario_id, anuncio_id, nome, telefone, mensagem} = req.body

    let ok = await Message.create({usuario_id, anuncio_id, nome, telefone, mensagem})

    console.log(ok)
    res.json(ok)
  }
}

module.exports = MessageController