const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    todoCreate,
    todoShow,
    todoUpdate,
} = require("../controllers/todos");

/* POST todo element /todo */
router.post('/', auth, asyncErrorHandler(todoCreate));

/* GET todo elements /todo */
router.get('/', auth, asyncErrorHandler(todoShow));

/* PUT todo elements /todo/:id */
router.put('/:id', auth, asyncErrorHandler(todoUpdate));

module.exports = router;
