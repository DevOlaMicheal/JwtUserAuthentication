const express = require('express')
const app  = express()
const morgan = require('morgan')
require('dotenv').config()
const routes = require('./router/authroutes')
const mongodb = require('./config/db')
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))
app.set('views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})


app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`app running on port ${process.env.PORT}`)
    mongodb

})