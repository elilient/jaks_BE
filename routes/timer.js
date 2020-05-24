const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    timerCreate,
    timerShow,
    timerUpdate,
    timerDelete,
    timerShowId,
} = require("../controllers/timer");

/* POST timer */
router.post('/', auth,  asyncErrorHandler(timerCreate));

/* GET timer */
router.get('/', auth, asyncErrorHandler(timerShow));

/* GET by ID timer */
router.get('/:id', auth, asyncErrorHandler(timerShowId));

/* PUT timer /timer/:id */
router.put('/:id', auth, asyncErrorHandler(timerUpdate));

/* DELETE timer /timer/:id */
router.delete('/:id', auth, asyncErrorHandler(timerDelete));

module.exports = router;
