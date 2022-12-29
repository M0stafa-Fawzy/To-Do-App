const { asyncHandler } = require("../utils/asyncHandler")
const { CustomError } = require("../utils/customError")
const User = require("../models/user")

exports.signup = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body
    if(!username || !email || !password) throw new CustomError('username, email, and password are required',400)

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password
    })
    if(!user) throw new CustomError('user not created', 400)

    const token = user.generateAuthToken()
    return res.status(200).json({ user, token })
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) throw new CustomError('email and password are required',400)

    const user = await User.findUser(email.toLowerCase(), password)
    const token = user.generateAuthToken()

    return res.status(200).json({ user, token })
})