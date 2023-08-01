const mongoose = require('mongoose')
const user = require('../models/model')
const jwt = require('jsonwebtoken')


// This function handles signup errors.
const handleError = (error) => {
    console.log(error.message, error.code)
    const errors = {firstname: "", lastname: "", email: "", password: ""}

    if(error.message === "invalid email") {
        errors.email = "email not registered to any account"
       
    }
    if(error.message === "invalid password") {
        errors.password = "incorrect password"
    }

    if(error.code === 11000) {
        errors.email = "Email already registered to an account"
        return errors;
    }

    if(error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            // let path = properties.path
            errors[properties.path] = properties.message
            // console.log(properties.path)
        })

    }

    return (errors)
}

// this function creates JWT token

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, 'ola dev secret', {
        expiresIn: maxAge
    })
}

// get login
const getsigninPage = (req, res) => {
    res.render('signin')
}

const getsignupPage = (req, res) => {
    res.render('signup')
}

const postSignup = async (req, res) => {
 
    const {firstname, lastname, email, password} = req.body

    try {
        const result =  await user.create({firstname, lastname, email, password})
        const token = createToken(result._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: result._id})
    } catch (error) {
        const errors = handleError(error)
        res.json({ errors })
    }
}

const postSignin = async (req, res) => {

    const {email, password} = req.body

   
    try{
        const account = await user.login(email, password)
        const token = createToken(account._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: account._id})

    }catch(err) {
        const errors = handleError(err)
        console.log(errors)
        res.status(400).json({errors})
    }
    
}
module.exports = {postSignin, postSignup, getsigninPage, getsignupPage}