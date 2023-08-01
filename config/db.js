const mongoose = require('mongoose')
require('dotenv').config()

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.DBURI)
        console.log("connected");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = dbconnect()