const nodemailer = require('nodemailer');

const {EM_HOST,EM_PORT,EM_USER,EM_PASS} = process.env

const Email = nodemailer.createTransport({
    host: EM_HOST,
    port: EM_PORT,  
    secure: true,
    auth:{user:EM_USER,pass: EM_PASS},
    tls: {rejectUnauthorized: false},
})

module.exports = Email

