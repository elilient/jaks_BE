const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    clientCreate,
    clientShow,
} = require("../controllers/client");

/* POST clients create /clients */
router.post('/', auth,  asyncErrorHandler(clientCreate));

/* GET clients show /clients/:id */
router.get('/:id', asyncErrorHandler(clientShow));

module.exports = router;
