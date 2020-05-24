const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
    timedTask: String,
    clientName: String,
    time: String,
    lawyer_id: Schema.Types.ObjectId
});

module.exports = mongoose.model("Timer", TimerSchema);
