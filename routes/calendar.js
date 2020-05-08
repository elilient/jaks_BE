const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    calendarCreate,
    calendarShow,
    calendarUpdate,
    calendarDelete,
} = require("../controllers/calendar");

/* POST calendar */
router.post('/:id', auth,  asyncErrorHandler(calendarCreate));

/* GET calendar */
router.get('/:id', asyncErrorHandler(calendarShow));

/* PUT clients update /clients/:id */
router.put('/:id', asyncErrorHandler(calendarUpdate));

/* DELETE clients delete /clients/:id */
router.delete('/:id', asyncErrorHandler(calendarDelete));



module.exports = router;
