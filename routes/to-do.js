const router = require("express").Router()
const { auth } = require("../src/middlewares/auth")
const {
    createToDo,
    getSingleToDo,
    updateToDo,
    deleteToDo,
    getAllToDos
} = require("../controllers/to-do")

router.use(auth)
router.route("/").post(createToDo).get(getAllToDos)
router.route('/:todoID')
    .get(getSingleToDo)
    .put(updateToDo)
    .delete(deleteToDo)

module.exports = router