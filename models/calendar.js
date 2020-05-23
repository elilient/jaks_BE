const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    eventDate: Date,
    time: String,
    task: String,
    lawyer_id: Schema.Types.ObjectId
});

module.exports = mongoose.model("Calendar", CalendarSchema);
