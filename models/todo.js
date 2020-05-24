const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: String,
    isDone: {
        type: Boolean,
        default: false
    },
    lawyer_id: Schema.Types.ObjectId
});

module.exports = mongoose.model("Todo", TodoSchema);