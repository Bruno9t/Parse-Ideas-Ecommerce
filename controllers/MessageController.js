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
  }
}

module.exports = MessageController