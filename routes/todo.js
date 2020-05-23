const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    todoCreate,
} = require("../controllers/todos");

/* POST todo element /todo */
router.post('/', auth, asyncErrorHandler(todoCreate));

module.exports = router;
