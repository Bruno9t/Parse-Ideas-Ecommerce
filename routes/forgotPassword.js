const express = require('express')

const router = express.Router()

const ForgotPassword = require('../controllers/ForgotPassword')


router.get('/forgot',ForgotPassword.index)
router.put('/forgot',ForgotPassword.send)



module.exports = router