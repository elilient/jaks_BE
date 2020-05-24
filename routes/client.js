const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    clientCreate,
    clientShow,
    clientUpdate,
    clientDelete,
    dataCreate
} = require("../controllers/client");

/* POST client /client */
router.post('/', auth,  asyncErrorHandler(clientCreate));

/* GET client /client/:id */
router.get('/:id', auth, asyncErrorHandler(clientShow));

/* PUT client /client/:id */
router.put('/:id', auth, asyncErrorHandler(clientUpdate));

/* DELETE client /client/:id */
router.delete('/:id', auth, asyncErrorHandler(clientDelete));

/* CREATE data /client/:id */
router.post('/:id', auth, asyncErrorHandler(dataCreate));

module.exports = router;
