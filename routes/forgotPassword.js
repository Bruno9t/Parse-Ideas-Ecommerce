const express = require('express')

const router = express.Router()

const ForgotPassword = require('../controllers/ForgotPassword')


router.get('/forgot',ForgotPassword.index)
router.patch('/forgot',ForgotPassword.send)



module.exports = router