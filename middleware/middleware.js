const jwt = require('jsonwebtoken')
const User = require('../models/model')

const verifyJwt = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, 'ola dev secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.redirect('/api/signin')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/api/signin')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, 'ola dev secret', async (err, decodedToken) => {
            if(err){
                console.log(err)
                next()
            }else{
                const getUser = await User.findById(decodedToken.id)
                console.log(getUser)
                res.locals.user = getUser
                next()
            }
        })
    }else {
        console.log('no user')
        next()
    }
}


module.exports = {verifyJwt, checkUser}