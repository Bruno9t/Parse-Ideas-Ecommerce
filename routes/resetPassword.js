const express = require('express')
const router = express.Router()

const ResetPassword = require('../controllers/ResetPassword')


router.get('/reset/:id/:token',ResetPassword.index)
router.patch('/reset',ResetPassword.update)


module.exports = router