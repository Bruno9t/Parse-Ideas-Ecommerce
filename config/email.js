const nodemailer = require('nodemailer');
require('dotenv').config()

const Email = nodemailer.createTransport({
    host: "smtp.parseideias.tecnologia.ws",
    port: 465,  
    secure: true,
    auth:{
        user: 'site@parseideias.tecnologia.ws',
        pass: process.env.EM_PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
})

module.exports = Email