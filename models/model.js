const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userScema = new schema({
    firstname: {
        type: String,
        required: [true, "first name is required"]
    },
    lastname: {
        type: String,
        required: [true, "last name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password cannot be less than six characters"],
    
    }
}, {timestamps: true})


// this mongoose hook happens before document is saved to db

userScema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userScema.statics.login = async function (email, password) {
    const user =  await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)

        if(auth) {
            return user
        } throw Error("invalid password")

    } throw Error("invalid email")
}

module.exports = mongoose.model('user', userScema)