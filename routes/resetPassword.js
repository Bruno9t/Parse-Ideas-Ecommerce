const express = require('express')
const router = express.Router()

const ResetPassword = require('../controllers/ResetPassword')


router.get('/reset/:id/:token',ResetPassword.index)


module.exports = router