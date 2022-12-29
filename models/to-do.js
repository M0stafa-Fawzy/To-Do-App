const mongoose = require("mongoose")

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        required: true,
        enum: ['pending','done'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('to-do', toDoSchema)