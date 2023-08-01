const express = require('express')
const router = express.Router()
const { getsignupPage, getsigninPage, postSignin, postSignup,logout } = require('../controllers/controllers')


router.get('/signin', getsigninPage)
router.get('/signup', getsignupPage)
router.get('/logout', logout)


router.post('/signin', postSignin)
router.post('/signup', postSignup)

module.exports = router



