const express = require('express')
const router = express.Router()
const { getsignupPage, getsigninPage, postSignin, postSignup } = require('../controllers/controllers')


router.get('/signin', getsigninPage)
router.get('/signup', getsignupPage)

router.post('/signin', postSignin)
router.post('/signup', postSignup)

module.exports = router



