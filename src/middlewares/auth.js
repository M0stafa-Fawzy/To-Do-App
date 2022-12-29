const { verify } =require("jsonwebtoken")
const { asyncHandler } = require("../../utils/asyncHandler")
const { CustomError } = require("../../utils/customError")

exports.auth = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.header('Authorization')
    if (!authHeader) throw new CustomError('auhorization header is not provided', 401)

    const token = authHeader?.replace('Bearer ', '')
    if (!token) throw new CustomError('auhorization token is not provided', 401)

    verify(token, process.env.JWT_SECRET_KEY, async (err, { id }) => {
        if (err) throw new CustomError(`token error is ${err.message}`, 401)

        req.id = id
        next()
    })
})