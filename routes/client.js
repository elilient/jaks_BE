const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    clientCreate,
} = require("../controllers/client");

/* POST clients create /clients */
router.post('/', auth,  asyncErrorHandler(clientCreate));

module.exports = router;
