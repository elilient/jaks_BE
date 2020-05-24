const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    calendarCreate,
    calendarShow,
    calendarUpdate,
    calendarDelete,
    calendarShowId,
} = require("../controllers/calendar");

/* POST calendar /calendar/ */
router.post('/', auth,  asyncErrorHandler(calendarCreate));

/* GET calendar /calendar/ */
router.get('/', auth, asyncErrorHandler(calendarShow));

/* GET by ID calendar /calendar/:calid */
router.get('/:calid', auth, asyncErrorHandler(calendarShowId));

/* PUT clients update /calendar/:calid */
router.put('/:calid', auth, asyncErrorHandler(calendarUpdate));

/* DELETE clients delete /calendar/:calid */
router.delete('/:calid', auth, asyncErrorHandler(calendarDelete));



module.exports = router;
