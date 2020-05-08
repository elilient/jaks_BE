const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    calendarEntry: {
        datetime: Date,
        description: String
    }
});

module.exports = mongoose.model("Calendar", CalendarSchema);
