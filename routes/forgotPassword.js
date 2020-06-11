const express = require('express')

const router = express.Router()

const ForgotPassword = require('../controllers/ForgotPassword')


router.get('/forgot',ForgotPassword.index)



module.exports = router