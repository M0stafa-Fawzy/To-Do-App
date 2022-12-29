const router = require("express").Router()
const { auth } = require("../src/middlewares/auth")
const {
    createToDo,
    getSingleToDo,
    updateToDo,
    deleteToDo
} = require("../controllers/to-do")

router.use(auth)
router.route("/").post(createToDo)
router.route('/:todoID')
    .get(getSingleToDo)
    .put(updateToDo)
    .delete(deleteToDo)

module.exports = router