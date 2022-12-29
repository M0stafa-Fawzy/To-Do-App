const { asyncHandler } = require("../utils/asyncHandler")
const { CustomError } = require("../utils/customError")
const TodO = require('../models/to-do')

exports.createToDo = asyncHandler(async (req, res, next) => {
    const { id } = req
    const { title, description, status } = req.body
    if(!title || !description ) throw new CustomError("to-do title and status are required", 400)

    const toDo = await TodO.create({
        title, 
        description, 
        status,
        userId: id
    })
    if(!toDo) throw new CustomError("to do item not created", 400)

    return res.status(201).json({ toDo })
})

exports.getSingleToDo = asyncHandler(async (req, res, next) => {
    const { id } = req
    const { todoID } = req.params // it can be passed as req.query from front-end
    if(!todoID) throw new CustomError("to-do id not provided", 400)

    const toDo = await TodO.findOne({
        _id: todoID,
        userId: id
    })
    if(!toDo) throw new CustomError("to do item not found. it may be deleted or it does not belong to you", 400)

    return res.status(200).json({ message: "CREATED", toDo })
})

exports.updateToDo = asyncHandler(async (req, res, next) => {
    const { id } = req
    const { todoID } = req.params
    if(!todoID) throw new CustomError("to-do id not provided", 400)

    const { title, description, status } = req.body
    if(!title && !description && !status) throw new CustomError("you must provide at least one property to update this item", 400)

    const toDo = await TodO.findOneAndUpdate(
        { _id: todoID, userId: id },
        { title, description, status },
        { new: true, runValidators:true }
    )
    if(!toDo) throw new CustomError("to do item not updated. it may be deleted or it does not belong to you", 400)

    return res.status(200).json({ message: "UPDATED", toDo })
})

exports.deleteToDo = asyncHandler(async (req, res, next) => {
    const { id } = req
    const { todoID } = req.params
    if(!todoID) throw new CustomError("to-do id not provided", 400)

    const toDo = await TodO.findOneAndDelete({ _id: todoID, userId: id })
    if(!toDo) throw new CustomError("to do item not deleted. it may be already deleted or it does not belong to you", 400)

    return res.status(200).json({ message: "DELETED", toDo })
})

exports.getAllToDos = asyncHandler(async (req, res, next) => {
    const { id } = req
    const toDos = await TodO.find({ userId: id })
    return res.status(200).json({ message: "OK", toDos })
})
