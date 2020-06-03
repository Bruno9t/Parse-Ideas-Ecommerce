const {Message} = require('../models');

const MessageController = {
  create: (req,res)=>{
    let {usuario_id, anuncio_id, nome, email, celular, telefone, mensagem} = req.body
    
    return Message.create({
      usuario_id:usuario_id,
      anuncio_id:anuncio_id,
      nome:nome,
      email:email,
      celular:celular,
      telefone:telefone,
      mensagem:mensagem
    }).then(ok => {
      return res.json({resp:'ok'})
    }).catch(err => {
      console.log(err)
      return res.json({resp:'error'})
    })
  },
  list: async (req, res) => {
    const {id_usuario} = req.session.user || req.user

    console.log(id_usuario)

    let messages = await Message.findAll({
      where:{
        usuario_id:id_usuario
      }
    })

    res.json(messages)
  }
}

module.exports = MessageController