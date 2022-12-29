require("dotenv").config()
require("./db/connection")
const express = require("express")
const app = express()
const { errorHandler } = require("./middlewares/errorHandler")
const usersRouter = require("../routes/user")
const toDoRouter = require("../routes/to-do")

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/todos', toDoRouter)
app.use(errorHandler)


// const User = require("../models/user")
// User.create({
//     username: "Mostafa",
//     email: "mostafa@example.com",
//     "password": "1234567"
// }).then(d => console.log(d)).catch(e => console.log(e.message))


try {
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`running on port ${port}`))
} catch (error) {
    console.log(`there is an error while listening on port ${port} and its message is ${error.message}`);
}