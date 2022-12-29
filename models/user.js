const mongoose = require("mongoose")
const { hash, compare, genSalt } = require("bcryptjs")
const { CustomError } = require("../utils/customError")
const { sign } = require("jsonwebtoken")
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [7, 'password must be taller than 7 charachter']
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value){
            if(!isEmail(value)) throw new CustomError("please enter a correct email", 400)
        }
    }
}, { timestamps: true })

userSchema.statics.findUser = async function(email, password){
    const user = await User.findOne({ email })
    if(!user) throw new CustomError("user not found!", 401) // I think status code here prefered to be 401 as it's an authorized access

    const isCorrectPassword = await compare(password, user.password)
    if(!isCorrectPassword) throw new CustomError("wrong password", 401) // I think status code here prefered to be 401 as it's an authorized access

    return user
}

userSchema.methods.generateAuthToken = function() {
    return sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })
}

userSchema.pre('save', async function(next) {
    const salt = await genSalt(10)
    if(this.isModified('password')){
        this.password = await hash(this.password, salt)
    }
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User
