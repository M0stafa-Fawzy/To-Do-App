const mongoose = require("mongoose")
mongoose.set('strictQuery', true)


mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('database connected successfully'))
    .catch(error => console.log(`error while connecting with database ${error.message}`))